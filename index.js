import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/users.js";
import recommendRouter from "./routes/recommendations.js";
import config from "config";

const app = express();
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRouter);
app.use("/recommendations", recommendRouter);

const port = process.env.PORT || 5000;

mongoose
  .connect(config.get("uri"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to database successfully");
    app.listen(port, "localhost", () =>
      console.log(`Server Running on Port: http://localhost:${port}`)
    );
  })
  .catch((error) => console.log(`${error} did not connect`));
