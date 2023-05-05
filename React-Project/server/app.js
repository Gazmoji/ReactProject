const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const models = require("./models");
const authenticate = require("./middlewares/authentication");

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await models.User.findOne({ where: { email: email } });
    if (existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "Email already exists." });
    }

    const user = await models.User.create({
      username: username,
      email: email,
      password: password,
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

    const token = jwt.sign(
      { username: user.username, email: user.email },
      "SECRETKEY"
    );

    res.json({ success: true, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(8080, () => {
  console.log("Server is running....");
});
