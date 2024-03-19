import express from "express";
import { Register } from "../controllers/register.js";
import { login } from "../controllers/login.js";
import { logout } from "../controllers/logout.js";

const router = express.Router();
router.route("/register").post(Register);
router.route("/login").post(login);
router.route("/logout").get(logout);

export default router;
