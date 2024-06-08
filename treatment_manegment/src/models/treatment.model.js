import mongoose from 'mongoose'
const { Schema } = mongoose

const treatmentSchema = new Schema({
    patientName: {
        type:String,
        required:true
    },
    doctorName:{
        type:String,
        required:true
    },
    appointmentDate:{
        type: Date,
        required: true
    },
    symptoms:{
        type:String,
        required:true
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    serialNumber: {
        type: Number,
        unique: true
    }
}, { timestamps: true })

export const Treatment = mongoose.model('Treatment', treatmentSchema)


