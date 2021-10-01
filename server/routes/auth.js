const express = require("express");
const { signup, login } = require("../controllers/auth");
// bOTH POST ROUTES BECAUSE WE HAVE TO SEND DATA FROM THE FRONTEND TO THE BACKEND
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
