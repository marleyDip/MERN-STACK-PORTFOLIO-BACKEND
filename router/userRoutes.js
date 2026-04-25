import express from "express";
import {
  forgotPassword,
  getUser,
  getUserForPortfolio,
  login,
  logout,
  register,
  resetPassword,
  updatePassword,
  updateProfile,
} from "../controller/userController.js";
<<<<<<< HEAD
=======

>>>>>>> 01408f9db6e9f9b896d80cf40404a295b58e63f8
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

<<<<<<< HEAD
router.get("/me/portfolio", getUserForPortfolio);

router.post("/register", register);
router.post("/login", login);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

router.get("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated, getUser);
router.put("/update/me", isAuthenticated, updateProfile);
router.put("/update/password", isAuthenticated, updatePassword);

=======
router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);

router.get("/me", isAuthenticated, getUser);
router.put("/update/me", isAuthenticated, updateProfile);

router.put("/update/password", isAuthenticated, updatePassword);
router.get("/me/portfolio", getUserForPortfolio);

router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

>>>>>>> 01408f9db6e9f9b896d80cf40404a295b58e63f8
export default router;
