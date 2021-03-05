import { Router } from "express";
import {
  getRecommendations,
  postRecommendations,
} from "../controllers/recommendations.js";
import auth from "../middlewares/auth.js";

var router = Router();

router.get("/", auth, getRecommendations);
router.post("/", auth, postRecommendations);

export default router;
