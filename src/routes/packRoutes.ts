import express from "express";
import {
  addPackage,
  getAllPackage,
  getSinglePackage,
  deletePackage,
} from "../controllers/packController";
import { validateAddPackage } from "../validators/packValidator";
import { isLogedIn, isOperator } from "../middlewares/roleMiddleware";

const router = express.Router();

router.post("/add", validateAddPackage, isLogedIn, isOperator, addPackage);

router.get("/get-all", getAllPackage);

router.get("/:id", getSinglePackage);

router.delete("/delete/:id", isLogedIn, isOperator, deletePackage);

export default router;
