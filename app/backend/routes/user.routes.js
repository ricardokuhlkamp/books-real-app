const express = require('express');

const UserController = require("../controllers/UserController");
const validateEmail = require('../middlewares/validateEmail');
const validateEmailAndPassord = require('../middlewares/validateEmailAndPassword');

const router = express.Router();

router.post("/login", validateEmailAndPassord, validateEmailAndPassord, UserController.loginUser);
router.post("/signin", validateEmail, validateEmailAndPassord, UserController.registerUser);
router.get("/getuser", UserController.getUserProfile);
router.get("/getuser/:_id", UserController.getUserById);

module.exports = router;
