import mongoose from 'mongoose'
import { Schema } from 'mongoose'
const mongoose = require('mongoose');

const userTreatmentSchema = new mongoose.Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
  },
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
  },
  appointmentDate:{
    type: Date,
    default: Date.now 
  },
  symptoms: {
    type: String,
    default: 'Not Specified',
  },
  tests: {
    type: String,
    default: 'Not Specified',
  },
  medicines: {
    type: String,
    default: 'Not Specified',
  },
  remarks: {
    type: String,
    default: 'Not Specified',
  },
  doctorSignature: {
    type: String,
    default: 'Not Specified',
  },
});

export const UserTreatment =  mongoose.model('UserTreatment', userTreatmentSchema);