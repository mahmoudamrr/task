const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Authentication failed, Token missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed, Token missing." });
  }

  try {
    const decode = jwt.verify(token, "secret_key");
    req.user = decode;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({
        message: "Authentication failed. Invalid token.",
        error: err.message,
      });
  }
};

module.exports = auth;
