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

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { status, data } = await UserService.loginUser(email, password);
  res.status(mapStatusHTTP(status)).send(data);
}

module.exports.getUserProfile = async (req, res) => {
  const { username } = req.body;
  const { status, data } = await UserService.getUserProfile(username);
  res.status(mapStatusHTTP(status)).send(data);
};

module.exports.getUserById = async (req, res) => {
  const { _id } = req.params;
  const { status, data } = await UserService.getUserById(_id);
  res.status(mapStatusHTTP(status)).send(data);
};
