const jwt = require("jsonwebtoken");

const generateJWTToken = (userId) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const expiresIn = '20h'; // Tempo de expiração do token (1 hora)

  // Cria o token JWT com base no ID do usuário
  const token = jwt.sign({ userId }, secretKey, { expiresIn });

  return token;
};

const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET_KEY);

module.exports = { generateJWTToken, verifyToken };
