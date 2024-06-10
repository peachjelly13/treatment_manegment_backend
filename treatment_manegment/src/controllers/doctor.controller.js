import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const generateRefreshAndAccessToken = async(userId)=>{
    try{
        const user = await User.findById(userId);  //this is an object
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken; //saving refreshtoken in our database
        await user.save({validateBeforeSave: false});
        return{accessToken,refreshToken}
    }
    catch(error){
        throw new ApiError(500,"something went wrong while generating access and refresh token")
    }
}

const registerDoctor = asyncHandler(async(req,res)=>{
    const {username,role,email,fullName,dateOfBirth,password,gender} = req.body;
    console.log(req.body)

    if(
        [username,role,email,fullName,dateOfBirth,password,gender].some((field)=>
        field?.trim() === "")
    ){
        throw new ApiError(400,"All Fields are required")
    }
    if(role==='admin' || role==='patient'){
        throw new ApiError(401,"EUnauthorized access enter the correct role")
    }

    if (role==='doctor' && !username.startsWith('DOCTOR_ACCESS')) {
        throw new ApiError(403, "This is an Doctor page only Doctors can access");
    }
    //checking if the user already exists or not 
    const existedUsername = await User.findOne({ username });
    const existedEmail = await User.findOne({email});

    if(existedUsername){
        throw new ApiError(409,"Username is taken")
    }
    if(existedEmail){
        throw new ApiError(409,"Email is already registered")
    }

    const user = await User.create({
        username,
        role,
        email,
        fullName,
        dateOfBirth,
        password,
        gender
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered Successfully")
    )
})

const loginDoctor = asyncHandler(async(req,res)=>{
    const {username,password} = req.body;
    if(!username && !password){
        throw new ApiError(400,"Both username and password required")
    }
    const user = await User.findOne({     //the instance of user that we found from my datbase  
        $or: [{username},{password}]
    })
    if(!user){
        throw new ApiError(404,"User doesnt exist")
    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(401,"Incorrect Password")
    }
    const {accessToken,refreshToken} = await generateRefreshAndAccessToken(user._id);

    const loggedInUser = await User.findById(user._id)
    .select("-password -refreshToken")

    const options = {
        httpOnly:true,
        secure:true
    }
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refrehToken",refreshToken,options)
    .json(
        
        new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken,
                    refreshToken
                },
                "User logged in Successfully"
        ) )})


const createUserTreatment = asyncHandler(async(req,res)=>{
    const{patient,doctorUserName,tests,medicines,remarks,doctorSignature} = req.body;
    const findPatient = User.findOne({username:patient});
    const findDoctor = User.findOne({username:doctorUserName});
    const user = await User.findOne({ username: patient });

    if ([patient,doctorUserName, tests, medicines, remarks, 
        doctorSignature].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    if(!findPatient){
        throw new ApiError(404,"No such Patient")
    }
    if(!findDoctor){
        throw new ApiError(404,"No such Doctor")
    }
    

    const UserTreatments = {
        patient,
        doctorUserName,
        tests,
        medicines,
        remarks,
        doctorSignature
    }

    user.userTreatment.push(UserTreatments);
    await user.save();
    return res.status(201).json(
        new ApiResponse(201, UserTreatments, "User Treatment Created successfully")
    );


})


const logoutDoctor = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(req.user._id,
        {
            $set:{
                refreshToken:undefined
            }
        },{
            new:true
        }
    )
    const options = {
        httpOnly:true,
        secure:true
    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .cookieCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged Out"))
})


export {
    registerDoctor,
    loginDoctor,
    logoutDoctor,
    createUserTreatment

}