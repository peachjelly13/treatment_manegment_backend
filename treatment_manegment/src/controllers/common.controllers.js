import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import { User } from "../models/user.model";
import ApiResponse from "../utils/ApiResponse";

const registerUser = asyncHandler(async(req,res)=>{
    const {username,role,email,fullName,dateOfBirth,password,gender} = req.body;

    if(
        [username,role,email,fullName,dateOfBirth,password,gender].some((field)=>
        field?.trim() === "")
    ){
        throw new ApiError(400,"All Fields are required")
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
        username:username.toLowerCase(),
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

export {
    registerUser,

}