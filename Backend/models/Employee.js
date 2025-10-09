const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  code: String,
  password: String,
  doj: String,
  dept: String,
  proj: String,
  role: { type: String, default: 'Employee' } // Add role field
});

module.exports = mongoose.model('Employee', employeeSchema);
