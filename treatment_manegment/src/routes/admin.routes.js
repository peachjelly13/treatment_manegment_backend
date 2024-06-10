import { Router } from "express";
import { registerAdmin, loginAdmin ,createUserTreatments, logoutAdmin} from "../controllers/admin.controller.js";
import multer from "multer";
import verifyUser from "../middleware/auth.middleware.js";

const router = Router();

// Define Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define routes
router.route("/register").post(upload.none(), registerAdmin);
router.route("/login").post(loginAdmin)
router.route("/logout").post(verifyUser,logoutAdmin)
router.route("/createUserTreatments").post(verifyUser,createUserTreatments)


export default router;
