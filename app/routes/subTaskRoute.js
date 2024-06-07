const express = require("express");
const router = express.Router();
const subtaskController = require("../controllers/subTask");

/**
 * @swagger
 * tags:
 *   name: Subtasks
 *   description: API for managing subtasks within a task including getting and editing subtasks
 */

/**
 * @swagger
 * /tasks/{taskId}/subtasks:
 *   get:
 *     summary: List all non-deleted subtasks for a specific task
 *     tags: [Subtasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's ID
 *     responses:
 *       200:
 *         description: A list of subtasks
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
 *       404:
 *         description: Task not found or no subtasks available
 */

router.get("/tasks/:taskId/subtasks", subtaskController.listSubtasks);

/**
 * @swagger
 * /tasks/{taskId}/subtasks:
 *   put:
 *     summary: Update subtasks for a specific task
 *     tags: [Subtasks]
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
 *               - subtasks
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The user's ID
 *               subtasks:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - subject
 *                     - deadline
 *                     - status
 *                   properties:
 *                     subject:
 *                       type: string
 *                       description: The subtask subject
 *                     deadline:
 *                       type: string
 *                       format: date-time
 *                       description: The subtask deadline
 *                     status:
 *                       type: string
 *                       description: The subtask status
 *                     isDeleted:
 *                      type: boolean
 *                      description: The subtask deletion status
 *     responses:
 *       200:
 *         description: The subtasks were updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Task not found
 */
router.put("/tasks/:taskId/subtasks", subtaskController.updateSubtasks);

module.exports = router;
