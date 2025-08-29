const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protect = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      console.log('Received token:', token); // Debug log
      if (!token || token === 'null' || token === 'undefined') {
        return res.status(401).json({ message: "Auth token missing or empty" });
      }
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) {
          return res.status(401).json({ message: "user not found" });
        }
        next();
      } catch (err) {
        console.error('JWT verification error:', err.message);
        return res.status(401).json({ message: "Invalid or malformed token" });
      }
    } else {
      return res.status(401).json({ message: "No Auth token provided" });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = protect;
