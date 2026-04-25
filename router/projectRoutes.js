import express from "express";
<<<<<<< HEAD
=======

>>>>>>> 01408f9db6e9f9b896d80cf40404a295b58e63f8
import {
  addNewProject,
  deleteProject,
  getAllProjects,
  getSingleProject,
  updateProject,
} from "../controller/projectController.js";
<<<<<<< HEAD
=======

>>>>>>> 01408f9db6e9f9b896d80cf40404a295b58e63f8
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

<<<<<<< HEAD
router.get("/getall", getAllProjects);
router.get("/get/:id", getSingleProject);

router.post("/add", isAuthenticated, addNewProject);
router.delete("/delete/:id", isAuthenticated, deleteProject);
router.put("/update/:id", isAuthenticated, updateProject);

=======
router.post("/add", isAuthenticated, addNewProject);
router.delete("/delete/:id", isAuthenticated, deleteProject);

router.put("/update/:id", isAuthenticated, updateProject);

router.get("/getall", getAllProjects);
router.get("/get/:id", getSingleProject);

>>>>>>> 01408f9db6e9f9b896d80cf40404a295b58e63f8
export default router;
