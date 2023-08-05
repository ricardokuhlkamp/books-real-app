const validateEmailAndPassord = (req, res, next) => {
  const { email, password } = req.body;
  if (email === undefined || email === '') {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  if (password === undefined || password === '') {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

module.exports = validateEmailAndPassord;