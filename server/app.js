require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const models = require("./models");
const bcrypt = require("bcrypt");
const authenticate = require("./middlewares/authentication");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../dist")));

const port = process.env.PORT || 3000;

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, salt);
  try {
    const existingUser = await models.User.findOne({ where: { email: email } });
    if (existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "Email already exists." });
    }

    const user = await models.User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await models.User.findOne({ where: { email: email } });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ name: user.name, email: user.email }, "SECRETKEY");

    res.json({ success: true, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist/index.html"));
  console.log(path.resolve(__dirname, "../dist/index.html"));
});

app.listen(port, () => {
  console.log("Server is running....");
});
