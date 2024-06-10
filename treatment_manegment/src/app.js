import express from 'express'
import cookieParser from "cookie-parser"
import cors from 'cors'
import multer from 'multer';
import bodyParser from 'body-parser';

const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true 
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


import doctorRoute from './routes/doctor.routes.js'
import patientRoute from './routes/patient.routes.js'
import adminRoute from './routes/admin.routes.js'
app.use('/api/v1/patients',patientRoute);
app.use('/api/v1/doctors',doctorRoute);
app.use('/api/v1/admin',adminRoute);

// api/v1/patients/register 








export default app;

