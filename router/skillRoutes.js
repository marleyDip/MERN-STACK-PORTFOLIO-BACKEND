import express from "express";
import {
  addNewSkill,
  deleteSkill,
  getAllSkills,
  updateSkill,
} from "../controller/skillController.js";
<<<<<<< HEAD
=======

>>>>>>> 01408f9db6e9f9b896d80cf40404a295b58e63f8
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

<<<<<<< HEAD
router.get("/getall", getAllSkills);

router.post("/add", isAuthenticated, addNewSkill);
router.delete("/delete/:id", isAuthenticated, deleteSkill);
router.put("/update/:id", isAuthenticated, updateSkill);
=======
router.post("/add", isAuthenticated, addNewSkill);
router.delete("/delete/:id", isAuthenticated, deleteSkill);

router.put("/update/:id", isAuthenticated, updateSkill);
router.get("/getall", getAllSkills);
>>>>>>> 01408f9db6e9f9b896d80cf40404a295b58e63f8

export default router;
