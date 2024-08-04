import express from "express";
import {
  addChannel,
  getAllChannel,
  getSingleChannel,
  deleteChannel,
} from "../controllers/channelController";
import { validateAddChannel } from "../validators/channelValidator";
import { isOperator, isLogedIn } from "../middlewares/roleMiddleware";

const router = express.Router();

router.post("/add", validateAddChannel, isLogedIn, isOperator, addChannel);

router.get("/get-all", getAllChannel);

router.get("/get/:name", getSingleChannel);

router.delete("/delete/:name", isLogedIn, isOperator, deleteChannel);

export default router;
