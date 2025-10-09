const Employee = require('../models/Employee'); // <-- Use Employee model

exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Find employee by email and role
    const employee = await Employee.findOne({ email, role });

    if (!employee) {
      return res.json({ success: false, message: "Employee not found" });
    }

    // Check password (plain text)
    if (employee.password !== password) {
      return res.json({ success: false, message: "Invalid password" });
    }

    // Generate token if needed (optional)
    const token = "dummy-token"; // Replace with real JWT if required

    res.json({
      success: true,
      user: employee,
      token
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
