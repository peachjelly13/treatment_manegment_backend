import {Router} from 'express'
import {registerUser}from '../controllers/user.controller.js';
import {loginUser} from '../controllers/user.controller.js'
const router = Router();


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
// router.route("/treatments").get(userTreatments)
// router.route("/treatments/:id").get(getTreatmentById)
// router.route("/logout").get(logoutUser)

export default router;