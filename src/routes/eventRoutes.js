const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// //GET ALL EVENTS
// app.get('/events', eventController.getAllEvents);

// //CREATE A NEW EVENT
// app.post('/events', eventController.createEvent);

//GET SINGLE EVENT
// app.get('/events/:id', eventController.getEvent);

// //UPDATE AN EVENT
// app.patch('/events/:id', eventController.updateEvent);

// //DELETE AN EVENT
// app.delete('/events/:id', eventController.deleteEvent);

router
  .route('/')
  .get(eventController.getAllEvents)
  .post(eventController.createEvent);

router
  .route('/:id')
  .get(eventController.getEvent)
  .patch(eventController.updateEvent)
  .delete(eventController.deleteEvent);

module.exports = router;
