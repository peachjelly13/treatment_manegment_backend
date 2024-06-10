import mongoose from 'mongoose';

const { Schema } = mongoose;

const treatmentSchema = new Schema({
    serialNumber: {
        type: Number,
        required: true,
        unique:true
    },
    patient: {
        type: String,
        ref:'User'
    },
    doctorUserName: {
        type: String,
        required: true,
    },
    appointmentDate: {
        type: Date,
        required: true,
    },
    symptoms: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending',
    },
    age: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const Treatment = mongoose.model('Treatment', treatmentSchema);

export default Treatment;
