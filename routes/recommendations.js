import { Router } from "express";
import {
  getRecommendations,
  postRecommendations,
  getRecommendationByGenre,
  getRecommendationByType,
  getRecommendationByuserId,
} from "../controllers/recommendations.js";
import auth from "../middlewares/auth.js";

var router = Router();

router.get("/", getRecommendations);
router.post("/", auth, postRecommendations);

router.get("/genre/:genre", getRecommendationByGenre);
router.get("/type/:type", getRecommendationByType);
router.get("/:userId", auth, getRecommendationByuserId);

export default router;
