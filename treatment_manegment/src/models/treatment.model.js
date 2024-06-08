import mongoose from 'mongoose'
const { Schema } = mongoose

const treatmentSchema = new Schema({
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
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


