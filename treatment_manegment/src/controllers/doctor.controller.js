import asyncHandler from "../utils/asyncHandler";


const registerDoctor = asyncHandler(async(req,res)=>{
    res.status(200).json({
        message:"ok"
    })
})

export default registerDoctor