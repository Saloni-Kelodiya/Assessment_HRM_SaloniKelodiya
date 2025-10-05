const Employee = require('../models/Employee');

function generateEmployeeCode(lastCode) {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const prefix = `OS${yy}${mm}`; // Prefix: OS + year + month

  if (!lastCode || !lastCode.startsWith(prefix)) {
    return prefix + '001'; // Agar current month/year ka record nahi hai to 001 se start
  }

  const lastNumberStr = lastCode.slice(-3);
  const lastNumber = parseInt(lastNumberStr, 10);
  const newNumber = String(lastNumber + 1).padStart(3, '0'); // Increment last 3 digits

  return prefix + newNumber;
}
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find(); // Sab employees laao
    res.json({ success: true, employees });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addEmployee = async (req, res) => {
  try {
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const prefix = `OS${yy}${mm}`;

    // DB me last employee with current month prefix dhundhein
    const lastEmployee = await Employee.findOne({ code: { $regex: `^${prefix}` } })
      .sort({ code: -1 })
      .exec();

    const newCode = generateEmployeeCode(lastEmployee ? lastEmployee.code : null);

    const employeeData = {
      ...req.body,
      code: newCode, // Backend se generated code override karta hai
    };

    const employee = new Employee(employeeData);
    await employee.save();

    res.json({ success: true, message: 'Employee added successfully', employee });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
