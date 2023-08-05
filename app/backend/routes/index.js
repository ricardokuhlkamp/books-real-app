const express = require('express');
const router = express.Router();
const routerBook = require("./book.routes");
const routerUser = require("./user.routes");

router.use("/book", routerBook);
router.use("/user", routerUser);

module.exports = router;
