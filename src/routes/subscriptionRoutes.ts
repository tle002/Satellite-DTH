import express from "express";
import {
  subscribePackage,
  subscribeAddon,
} from "../controllers/subscriptionController";
import { isLogedIn } from "../middlewares/roleMiddleware";

const router = express.Router();
router.post("/:packId", isLogedIn, subscribePackage);
router.post("/addon/:packId", isLogedIn, subscribeAddon);

export default router;
