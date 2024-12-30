const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../modals/User");

//register

router.post("/register", async (req, res) => {
  console.log("nice");
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ message: "All field Required" });

    const existUser = await User.findOne({ email });
    if (existUser)
      return res.status(400).json({ message: "Email already exist" });

    const hashedPassword = await bcrypt.hash(password, 10); // Wait for hashing

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword, // Use hashed password
    });

    await newUser.save();

    res.status(200).json({ message: "user register successfully" });
  } catch (error) {
    console.log("error while registering the user...", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password){
      return  res.status(400).json({ message: "All field required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return  res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET
    );
    return  res.status(200).json({ token, message: "user login successfully" });
  } catch (error) {
    console.log("error while login user...", error);
    return  res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
