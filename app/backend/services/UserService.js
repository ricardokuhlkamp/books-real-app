const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { generateJWTToken } = require("../utils/auth");

const registerUser = async (username, email, password) => {
  try {    
    const existingUserName = await User.findOne({username});
    if (existingUserName) {
      return { status: 'BADREQUEST', data: 'User already registered with this username.' };
    }    
    const existingUserEmail = await User.findOne({email});
    if (existingUserEmail) {
      return { status: 'BADREQUEST', data: 'User already registered with this email.' };
    }
    // Criptografar a senha antes de salvar o usuário
    const hashedPassword = await bcrypt.hash(String(password), +process.env.BCRYPT_SECRET_KEY);

    // Gerar token JWT após o registro
    const newUser = await User.create({ username, email, password: hashedPassword });

    // Gerar token JWT após o registro
    const token = generateJWTToken(newUser._id);
    return { status: 'SUCCESSFUL', data: token };
  } catch (error) {
    return { status: 'ERROR', data: `Error: ${error}` };
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { status: 'NOTFOUND', data: 'Invalid credentials.' };
    }
    const bcryptCompare = await bcrypt.compare(String(password), user.password);
    if (!bcryptCompare) {
      return { status: 'UNAUTHORIZED', data: 'Invalid credentials.' };
    }
    const token = generateJWTToken(user._id);
    return { status: 'SUCCESSFUL', data: token };
  } catch (error) {
    return { status: 'ERROR', data: `Error: ${error}` };
  }
};

const getUserProfile = async (username) => {
  try {
    const user = await User.find({username: { $regex: username}}, {username: true, _id: false});
    if (!user || user.length === 0) {
      return { status: 'NOTFOUND', data: 'user not found' };
    }
    return { status: 'SUCCESSFUL', data: user };
  } catch (error) {
    return { status: 'ERROR', data: `Error: ${error}` };
  }
};

const getUserById = async (_id) => {
  try {
    const user = await User.findById(_id);
  if (!user) {
    return { status: 'NOTFOUND', data: 'user not found' };
  };
    return { status: 'SUCCESSFUL', data: user };
  } catch (error) {
    return { status: 'ERROR', data: `Error: ${error}` };
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  getUserById,
}