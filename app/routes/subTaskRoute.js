const express = require("express");
const router = express.Router();
const subtaskController = require("../controllers/subTask");

router.get("/tasks/:taskId/subtasks", subtaskController.listSubtasks);
router.put("/tasks/:taskId/subtasks", subtaskController.updateSubtasks);

module.exports = router;
