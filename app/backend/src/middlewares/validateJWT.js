const { verifyToken } = require("../utils/auth");

const validateJWT = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: "Token not found" });
    }
    try {
      const data = verifyToken(authorization);
      if (!data) {
        return res.status(401).json({ message: "Expired or invalid token" });
      }
      req.payload = data;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Expired or invalid token" });
    }
  } catch (error) {
    res.status(401).json(data);
  }
};

module.exports = validateJWT;
