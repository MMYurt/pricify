import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import router from "./routes/index.js";

dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, () => console.log("Connected to DB"));

app.use(
  cors({
    origin: "*",
  })
);

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 50, // allow 50 requests per 15 minutes, then...
  delayMs: 500, // begin adding 500ms of delay per request above 100:
  // request # 101 is delayed by  500ms
  // request # 102 is delayed by 1000ms
  // request # 103 is delayed by 1500ms
  // etc.
});

app.use("/", speedLimiter);
app.use("/", limiter);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", router);


app.listen(5000, () => {
  console.log(`Example app listening on port 5000!`);
});
