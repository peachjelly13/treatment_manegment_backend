import mongoose from 'mongoose';
const { Schema } = mongoose;

const userTreatmentSchema = new Schema({
    patientName:{
      type:String,
      required:true
    },
    tests: {
        type: String,
        default: 'Not Specified'
    },
    medicines: {
        type: String,
        default: 'Not Specified'
    },
    remarks: {
        type: String,
        default: 'Not Specified'
    },
    doctorSignature: {
        type: String,
        default: 'Not Specified'
    }
}, { timestamps: true });

export const UserTreatment = mongoose.model('UserTreatment', userTreatmentSchema);
