import mongoose from "mongoose";

const { Schema, model } = mongoose;
export const genres = [
  "action",
  "drama",
  "romance",
  "sci-fi",
  "horror",
  "comedy",
  "war",
  "adventure",
  "sports",
  "documentary",
];
const recommendationsModel = Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true, enum: ["movie", "series"] },
    genre: {
      type: String,
      required: true,
      enum: genres,
    },
    imgUrl: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);
const Recommendation = model("Recommendation", recommendationsModel);
export default Recommendation;
