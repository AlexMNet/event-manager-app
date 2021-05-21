const express = require('express');

const router = express.Router();
const eventController = require('../controllers/eventController');
const { authenticateUser, checkIfAdmin } = require('../middleware/auth');

router
  .route('/')
  .get(authenticateUser, eventController.getAllEvents)
  .post(authenticateUser, eventController.createEvent);

router
  .route('/:id')
  .get(authenticateUser, eventController.getEvent)
  .patch(authenticateUser, checkIfAdmin, eventController.updateEvent)
  .delete(authenticateUser, checkIfAdmin, eventController.deleteEvent);

module.exports = router;
