import express from "express";
import {
  deleteTimeline,
  getAllTimelines,
  postTimeline,
  // updateTimeline,
} from "../controller/timelineController.js";
<<<<<<< HEAD
=======

>>>>>>> 01408f9db6e9f9b896d80cf40404a295b58e63f8
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

<<<<<<< HEAD
router.get("/getall", getAllTimelines);

router.post("/add", isAuthenticated, postTimeline);
router.delete("/delete/:id", isAuthenticated, deleteTimeline);
=======
router.post("/add", isAuthenticated, postTimeline);
router.delete("/delete/:id", isAuthenticated, deleteTimeline);
router.get("/getall", getAllTimelines);
>>>>>>> 01408f9db6e9f9b896d80cf40404a295b58e63f8

export default router;
