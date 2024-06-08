import mongoose from 'mongoose';
const { Schema } = mongoose;
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const sittingHoursSchema = new Schema({
    day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    }
});

const doctorSchema = new Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        index:true,
    },
    specialization:{
        type:String,
        required:true,
    },
    sittingHours: [sittingHoursSchema], // Array of sitting hours
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    dateOfBirth: {
        type: Date,
        required: true,
        trim: true,
    },
    password:{
        type:String, 
        required:[true,'Password Is Required'] 
    },
    refreshToken:{
        type:String
    }
},{
    timestamps:true  
});

doctorSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
});

doctorSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
};

doctorSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id:this._id,   // this is basically the payload, everything we can access using database query
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
);

};

doctorSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id:this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
);
};

export const Doctor = mongoose.model("Doctor",doctorSchema);
