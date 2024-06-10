import { Router } from "express";
import { getUserTreatments, loginPatient, logoutPatient,registerPatient } from'../controllers/patient.controller.js'
import multer from "multer";
import verifyUser from "../middleware/auth.middleware.js";

const router = Router();

// Define Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define routes
router.route("/register").post(upload.none(), registerPatient);
router.route("/login").post(loginPatient)
router.route("/logout").post(verifyUser,logoutPatient)
router.route("/treatments").get(verifyUser,getUserTreatments)


//secured routes 


export default router;
