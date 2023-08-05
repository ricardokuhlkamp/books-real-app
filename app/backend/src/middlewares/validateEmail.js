const { verifyToken } = require("../utils/auth");

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (regex.test(email) === false) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  next();
};

module.exports = validateEmail;