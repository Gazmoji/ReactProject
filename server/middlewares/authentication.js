const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  // access the headers
  const header = req.headers["authorization"];
  if (header) {
    // token
    const token = header.split(" ")[1];
    try {
      const decoded = jwt.verify(token, "SECRETKEY");
      const username = decoded.username;
      const authUser = users.find((user) => user.username == username);
      if (authUser) {
        next();
      } else {
        res.json({ error: "Unable to authenticate." });
      }
    } catch {
      res.json({ error: "Unable to authenticate." });
    }
  } else {
    res.json({ error: "Required authorization headers are missing." });
  }
}

module.exports = authenticate;
