const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");

router.post("/tasks", taskController.addTask);
router.put("/tasks/:taskId", taskController.editTask);
router.delete("/tasks/:taskId", taskController.deleteTask);
router.get("/tasks", taskController.listTasks);

module.exports = router;
