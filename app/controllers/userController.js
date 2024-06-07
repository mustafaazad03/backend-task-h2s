const User = require("../models/user");
// Create User
exports.createUser = async (req, res) => {
	try {
		const { name, email } = req.body;
		// Checking if email is already present or not
		const checkUser = await User.findOne({ email });
		if (checkUser) {
			return res.status(400).json({ error: "Email already exists" });
		}
		const user = new User({ name, email, tasks: [] });
		await user.save();
		res.status(201).json(user);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Update User
exports.updateUser = async (req, res) => {
	try {
		const { userId } = req.params;
		const { name, email } = req.body;
		const user = await User.findByIdAndUpdate(
			userId,
			{ name, email },
			{ new: true }
		);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		res.status(200).json(user);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
