import { Router } from "express";
import { loginDoctor, registerDoctor } from "../controllers/doctor.controller.js";
import multer from "multer";

const router = Router();

// Define Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define routes
router.route("/register").post(upload.none(), registerDoctor);
router.route("/login").post(loginDoctor)


export default router;
