import asyncHandler from "../utils/asyncHandler.js";


const registerDoctor = asyncHandler(async(req,res)=>{
    res.status(200).json({
        message:"ok"
    })
})

const loginDoctor = asyncHandler(async(req,res)=>{

})

export {
    registerDoctor,
    loginDoctor
}