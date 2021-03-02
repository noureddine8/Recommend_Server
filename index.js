import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { uri } from "./config.js";
import router from "./routes/users.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", router);

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
