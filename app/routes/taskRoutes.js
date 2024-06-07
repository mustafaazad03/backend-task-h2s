const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API for managing tasks including adding, editing, and deleting tasks
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Add a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - subject
 *               - deadline
 *               - status
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The user's ID
 *               subject:
 *                 type: string
 *                 description: The task subject
 *               deadline:
 *                 type: string
 *                 format: date-time
 *                 description: The task deadline
 *               status:
 *                 type: string
 *                 description: The task status
 *               isDeleted:
 *                 type: boolean
 *                 description: Optional flag to mark if the task is deleted. Defaults to false.
 *                 default: false
 *     responses:
 *       201:
 *         description: The task was created successfully
 *       400:
 *         description: Invalid input
 */

router.post("/tasks", taskController.addTask);
/**
 * @swagger
 * /tasks/{taskId}:
 *   put:
 *     summary: Update an existing task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - subject
 *               - deadline
 *               - status
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The user's ID
 *               subject:
 *                 type: string
 *                 description: The task subject
 *               deadline:
 *                 type: string
 *                 format: date-time
 *                 description: The task deadline
 *               status:
 *                 type: string
 *                 description: The task status
 *     responses:
 *       200:
 *         description: The task was updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Task not found
 */
router.put("/tasks/:taskId", taskController.editTask);
/**
 * @swagger
 * /tasks/{taskId}:
 *   delete:
 *     summary: Soft delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
 *     responses:
 *       204:
 *         description: Task marked as deleted
 *       404:
 *         description: Task not found
 */
router.delete("/tasks/:taskId", taskController.deleteTask);
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: List all tasks for a user
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's ID
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   subject:
 *                     type: string
 *                   deadline:
 *                     type: string
 *                     format: date-time
 *                   status:
 *                     type: string
 *                   isDeleted:
 *                     type: boolean
 *                   subtasks:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         subject:
 *                           type: string
 *                         deadline:
 *                           type: string
 *                           format: date-time
 *                         status:
 *                           type: string
 *                         isDeleted:
 *                           type: boolean
 *       404:
 *         description: User not found or no tasks available
 */
router.get("/tasks", taskController.listTasks);

module.exports = router;
