const express = require('express');
const router = express.Router();
const { addEmployee } = require('../controllers/employeeController');
const employeeController = require('../controllers/employeeController');

router.post('/add', addEmployee);
router.get('/all', employeeController.getAllEmployees);

module.exports = router;
