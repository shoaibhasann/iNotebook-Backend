import { Router } from "express";
import { login, logout, register } from "../controllers/user.controllers.js";
import isLoggedIn from "../middlewares/auth .middleware.js";

const router = Router();

router.post('/', register);
router.post('/login', login);
router.get('/logout', isLoggedIn, logout);

export default router;