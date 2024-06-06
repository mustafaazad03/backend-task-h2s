const express = require("express");
const router = express.Router();
const { createUser, updateUser } = require("../controllers/userController");

router.post("/user", createUser);
router.put("/user/:userId", updateUser);

module.exports = router;
