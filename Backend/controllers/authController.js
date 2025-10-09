const User = require('../models/User');

exports.login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await User.findOne({ email, role });
    if (!user) return res.json({ success: false, message: "User not found" });
    if (user.password !== password)
      return res.json({ success: false, message: "Invalid password" });
    // Token logic agar chahiye to yahan add kar sakte hain
    res.json({ success: true, user, token: "dummy-token" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
