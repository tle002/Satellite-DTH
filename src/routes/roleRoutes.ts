import express from "express";
import {
  registerCtrl,
  loginCtrl,
  get1Ctrl,
  getAllCtrl,
  deleteCtrl,
} from "../controllers/roleController";
import {
  validateRegistration,
  validateLogin,
} from "../validators/roleValidator";
import { isLogedIn, isAdmin } from "../middlewares/roleMiddleware";

const router = express.Router();

router.post("/register", validateRegistration, registerCtrl);

router.post("/login", validateLogin, loginCtrl);

router.get("/get-all", getAllCtrl);

router.get("/get/:id", get1Ctrl);

router.delete("/delete/:id", isLogedIn, isAdmin, deleteCtrl);

export default router;
