import { Router } from "express";
import {
  getRecommendations,
  postRecommendations,
  getRecommendationByGenre,
  getRecommendationByType,
  getRecommendationByuserId,
  deleteRecById,
} from "../controllers/recommendations.js";
import auth from "../middlewares/auth.js";

var router = Router();

router.get("/", getRecommendations);
router.post("/", auth, postRecommendations);

router.get("/genre/:genre", getRecommendationByGenre);
router.get("/type/:type", getRecommendationByType);
router.get("/:userId", auth, getRecommendationByuserId);
router.delete("/:id", auth, deleteRecById);

export default router;
