/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs for adding and editing users
 */

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *               email:
 *                 type: string
 *                 description: The user's email
 *     responses:
 *       201:
 *         description: The user was created successfully
 *       400:
 *         description: Invalid input
 */
const express = require("express");
const router = express.Router();
const { createUser, updateUser } = require("../controllers/userController");

router.post("/user", createUser);
/**
 * @swagger
 * /user/{userId}:
 *   put:
 *     summary: Update an existing user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *               email:
 *                 type: string
 *                 description: The user's email
 *     responses:
 *       200:
 *         description: The user was updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 */
router.put("/user/:userId", updateUser);

module.exports = router;
