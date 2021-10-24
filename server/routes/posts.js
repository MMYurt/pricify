import express from "express";
const router = express.Router();
import verify from "./verifyToken.js";

router.get("/", verify, (req, res) => {
  res.json({
    posts: { title: "testing private route", description: "random data" },
  });
});

export default router;
