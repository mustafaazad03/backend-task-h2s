const User = require("../models/user");

// List Subtasks for a Task
exports.listSubtasks = async (req, res) => {
	try {
		const { taskId } = req.params;
		const { userId } = req.query;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		const task = user.tasks.id(taskId);
		if (!task || task.isDeleted) {
			return res.status(404).json({ error: "Task not found" });
		}
		const subtasks = task.subtasks.filter((subtask) => !subtask.isDeleted);
		res.status(200).json(subtasks);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Update Subtasks for a Task
exports.updateSubtasks = async (req, res) => {
	try {
		const { taskId } = req.params;
		const { userId, subtasks } = req.body;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		const task = user.tasks.id(taskId);
		if (!task || task.isDeleted) {
			return res.status(404).json({ error: "Task not found" });
		}
		task.subtasks = subtasks.concat(
			task.subtasks.filter((subtask) => subtask.isDeleted)
		);
		await user.save();
		res.status(200).json(task.subtasks.filter((subtask) => !subtask.isDeleted));
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
