const User = require("../models/UserModel");
const UserService = require("../services/UserService");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { generateJWTToken } = require("../utils/auth");
const mapStatusHTTP = require("../utils/mapStatusHTTP");

module.exports.registerUser = async (req, res) => {  
  const { username, email, password } = req.body;
  const { status, data} = await UserService.registerUser(username, email, password);  
  res.status(mapStatusHTTP(status)).send(data);
}
  // try {
  //   const { username, email, password } = req.body;
  //   const existingUserName = await User.findOne({username});
  //   if (existingUserName) return res.status(400).json({message: 'User already registered with this username.'});
  //   const existingUserEmail = await User.findOne({email});
  //   if (existingUserEmail) return res.status(400).json({message: 'User already registered with this email.'});
  //   // Criptografar a senha antes de salvar o usuário
  //   const hashedPassword = await bcrypt.hash(String(password), +process.env.BCRYPT_SECRET_KEY);

  //   // Gerar token JWT após o registro
  //   const newUser = await User.create({ username, email, password: hashedPassword });

  //   // Gerar token JWT após o registro
  //   const token = generateJWTToken(newUser._id);
  //   res.status(200).send({ message: "success", token: token});
  // } catch (error) {
  //   res.status(500).json({ message: `Error: ${error}` });
  // }


module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { status, data } = await UserService.loginUser(email, password);
  res.status(mapStatusHTTP(status)).send(data);
}
  // try {
  //   const { email, password } = req.body;
  //   const user = await User.findOne({ email });

  //   if (!user) {
  //     throw new Error('Invalid credentials.');
  //   }

  //   const bcryptCompare = await bcrypt.compare(String(password), user.password);

  //   if (!bcryptCompare) {
  //     throw new Error('Invalid credentials.');
  //   }

  //   const token = generateJWTToken(user._id);
  //   res.status(200).json({ message: "success", token: token});
  // } catch (error) {
  //   res.status(401).json({ error: 'Invalid credentials.' });
  // }
// };

module.exports.getUserProfile = async (req, res) => {
  const { username } = req.body;
  const { status, data } = await UserService.getUserProfile(username);
  res.status(mapStatusHTTP(status)).send(data);
  // const { username } = req.body;
  // const user = await User.find({username: { $regex: username}}, {username: true, _id: false});
  // if (!user) {
  //   return res.status(404).send("user not found");
  // };
  // return res.status(200).send(user);
};

module.exports.getUserById = async (req, res) => {
  const { _id } = req.params;
  const { status, data } = await UserService.getUserById(_id);
  res.status(mapStatusHTTP(status)).send(data);
  // const { _id } = req.params;
  // const user = await User.findById(_id);
  // if (!user) {
  //   return res.status(404).send("user not found");
  // };
  // return res.status(200).send(user);
};
