const User = require("../models/user");

// Add a New Task
exports.addTask = async (req, res) => {
	const { userId, subject, deadline, status } = req.body;

	try {
		const user = await User.findById(userId);
		if (!user) return res.status(404).json({ error: "User not found" });

		const newTask = {
			subject,
			deadline,
			status,
			isDeleted: false,
			subtasks: [],
		};
		user.tasks.push(newTask);

		await user.save();
		res.json(user.tasks[user.tasks.length - 1]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Edit a Task
exports.editTask = async (req, res) => {
	const { taskId } = req.params;
	const { userId, subject, deadline, status } = req.body;

	try {
		const user = await User.findOne({ _id: userId, "tasks._id": taskId });
		if (!user) return res.status(404).json({ error: "Task not found" });

		const task = user.tasks.id(taskId);
		if (task.isDeleted)
			return res.status(400).json({ error: "Cannot edit a deleted task" });

		task.subject = subject;
		task.deadline = deadline;
		task.status = status;

		await user.save();
		res.json(task);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Delete a Task
exports.deleteTask = async (req, res) => {
	const { taskId } = req.params;
	const { userId } = req.body;

	try {
		const user = await User.findOne({ _id: userId, "tasks._id": taskId });
		if (!user) return res.status(404).json({ error: "Task not found" });

		const task = user.tasks.id(taskId);
		task.isDeleted = true;

		await user.save();
		res.json({ message: "Task deleted" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// List Tasks with Subtasks
exports.listTasks = async (req, res) => {
	const { userId } = req.query;

	try {
		const user = await User.findById(userId);
		if (!user) return res.status(404).json({ error: "User not found" });

		const tasks = user.tasks
			.filter((task) => !task.isDeleted)
			.map((task) => ({
				...task.toObject(),
				subtasks: task.subtasks.filter((subtask) => !subtask.isDeleted),
			}));

		res.json(tasks);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
