/*
 * routes/API/index.js
 */

import express from "express";
const router = express.Router();
import axios from "axios";
import authRouter from "./auth.js";
import postRouter from "./posts.js";
import dotenv from 'dotenv'

dotenv.config();


router.get("/getProducts", (req, res) => {
  var newData = [];
  axios
    .get(
      `https://api.trendyol.com/sapigw/suppliers/${process.env.TY_SUPPLIER_ID}/products?approved=true&size=2500`,
      {
        headers: {
          "User-Agent": `${process.env.TY_SUPPLIER_ID} - SelfIntegration`,
          "Access-Control-Allow-Origin": "*",
        },
        auth: {
          username: process.env.TY_API_USERNAME,
          password: process.env.TY_API_PASSWORD,
        },
      }
    )
    .then((resp) => {
      resp.data.content.forEach((el) => {
        let obj = {};
        obj.id = el.barcode;
        obj.title = el.title;
        obj.imageUrl = el.images.length > 0 ? el.images[0].url : "";
        obj.listPrice = el.listPrice;
        obj.onSale = el.onSale;
        obj.quantity = el.quantity;
        obj.salePrice = el.salePrice;

        newData.push(obj);
      });
      res.send(newData);
    });
});

router.post("/sendProduct", (req, res) => {
  console.log(req.body);
  res.status(200).send("OK");
});

router.use("/user", authRouter);
router.use("/posts", postRouter);

export default router;
