const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protect = async (req, resizeBy, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.User = await User.findById(decoded.id).select("-password");

      if (!req.User) {
        return res.status(401).json({ message: "user not found" });
      }
      next();
    } else {
      return res.status(401).json({ message: "No Auth token provided" });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = protect;
