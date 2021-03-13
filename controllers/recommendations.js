import Recommendation from "../models/recommendations.js";

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
