// routes/requests.js
const express = require('express');
const Request = require('../models/Request');
const router = express.Router();

// Get all requests
router.get('/requests', async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new request
router.post('/requests', async (req, res) => {
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

// Update request status
router.patch('/requests/:id', async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    request.status = req.body.status;
    const updatedRequest = await request.save();
    res.json(updatedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
