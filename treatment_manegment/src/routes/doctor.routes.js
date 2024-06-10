import { Router } from "express";
import { createUserTreatment, loginDoctor, logoutDoctor, registerDoctor } from "../controllers/doctor.controller.js";
import multer from "multer";
import verifyUser from "../middleware/auth.middleware.js";

const router = Router();

// Define Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define routes
router.route("/register").post(upload.none(), registerDoctor);
router.route("/login").post(loginDoctor)
router.route("/logout").post(verifyUser,logoutDoctor)
router.route("/createUserTreatment").post(verifyUser,createUserTreatment)



export default router;
