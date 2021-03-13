import mongoose from "mongoose";

const { Schema, model } = mongoose;
const recommendationsModel = Schema(
  {
    title: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);
const Recommendation = model("Recommendation", recommendationsModel);
export default Recommendation;
