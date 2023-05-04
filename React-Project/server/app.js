const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const models = require("./models");
const authenticate = require("./middlewares/authentication");

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const user = await models.User.build({
    username: username,
    email: email,
    password: password,
  });

  if (user) {
    const token = jwt.sign({ username: username, email: email }, "SECRETKEY");
    await user.save();
    res.json({ success: true, token: token });
  } else {
    res
      .status(401)
      .json({ success: false, message: "Username already exists." });
  }
});

app.listen(8080, () => {
  console.log("Server is running....");
});
