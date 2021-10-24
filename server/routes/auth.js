import express from "express";
const router = express.Router();
import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { registerValidation, loginValidation } from "../validation.js";

//REGISTER
router.post("/register", async (req, res) => {
  //Data Validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking whether the user is already in the DB
  const isEmailExists = await User.findOne({ email: req.body.email });
  if (isEmailExists) return res.status(400).send("Email already exists");

  //Hashing
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(req.body.password, salt);

  //Creating a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashed,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.statusCode(400).send(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking whether the user is already in the DB
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or password is wrong");

  const validPass = await bcrypt.compare(req.body.password, user.password)
  if(!validPass) return res.status(400).send('Email or password is wrong')


  //Create and assign a token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
  res.header('auth-token', token).send(token);

  res.send("Logged in")
  
});

export default router;
