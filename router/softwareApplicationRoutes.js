import express from "express";
import {
  addNewApplication,
  deleteApplication,
  getAllApplications,
} from "../controller/softwareApplicationController.js";
<<<<<<< HEAD
=======

>>>>>>> 01408f9db6e9f9b896d80cf40404a295b58e63f8
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

<<<<<<< HEAD
router.get("/getall", getAllApplications);

router.post("/add", isAuthenticated, addNewApplication);
router.delete("/delete/:id", isAuthenticated, deleteApplication);
=======
router.post("/add", isAuthenticated, addNewApplication);
router.delete("/delete/:id", isAuthenticated, deleteApplication);
router.get("/getall", getAllApplications);
>>>>>>> 01408f9db6e9f9b896d80cf40404a295b58e63f8

export default router;
