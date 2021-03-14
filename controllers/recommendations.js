import Recommendation, { genres } from "../models/recommendations.js";

export const getRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.find();
    res.status(200).json({ recommendations });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postRecommendations = async (req, res) => {
  const body = req.body;

  try {
    const result = await Recommendation.create({
      ...body,
      userId: req.userId,
    });
    res.status(201).json({ result });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getRecommendationByGenre = async (req, res) => {
  const genre = req.params.genre;
  if (!genres.includes(genre)) {
    res.status(400).json({ message: `${genre} is not a valid genre` });
  }

  try {
    const rec = await Recommendation.find({ genre });
    res.status(200).json({ rec });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getRecommendationByType = async (req, res) => {
  const type = req.params.type;
  if (!["movie", "series"].includes(type))
    res.status(400).json({ message: `${type} is not a valid type` });
  try {
    const rec = await Recommendation.find({ type });
    res.status(200).json({ rec });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRecommendationByuserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const rec = await Recommendation.find({ userId });
    res.status(200).json({ rec });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
