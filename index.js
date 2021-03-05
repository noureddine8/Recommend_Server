import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { uri } from "./config.js";
import userRouter from "./routes/users.js";
import recommendRouter from "./routes/recommendations.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/recommendations", recommendRouter);

const port = process.env.PORT || 5000;

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to database successfully");
    app.listen(port, "localhost", () => {
      console.log(`Server listening on port ${port}`);
    });
  }
);
