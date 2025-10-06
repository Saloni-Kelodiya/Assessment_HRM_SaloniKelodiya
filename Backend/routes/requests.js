const express = require('express');
const Request = require('../models/Request');
const router = express.Router();

// Get all requests
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new request
router.post('/', async (req, res) => {
  const request = new Request({
    type: req.body.type,
    reason: req.body.reason,
    status: req.body.status || 'Pending'
  });

  try {
    const newRequest = await request.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
