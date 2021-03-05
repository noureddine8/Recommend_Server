import mongoose from "mongoose";

const { Schema, model } = mongoose;
const recommendationsModel = Schema(
  {
    title: { type: String, required: true },
    region: { type: String, required: true },
    createdBy: { type: String, required: true }, //Eamil of the user
    season: {
      type: String,
      enum: ["winter", "spring", "summer", "autumn", "Not precised"],
      default: "Not precised",
    },
    type: {
      type: String,
      enum: ["Mountainous", "Coastal", "Urban", "Others"],
      default: "Others",
    },
    description: { type: String, required: true },
  },
  { timestamps: true }
);
const Recommendation = model("Recommendation", recommendationsModel);
export default Recommendation;
