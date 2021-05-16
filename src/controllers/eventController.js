const Event = require('../models/eventModel');

exports.getAllEvents = async (req, res) => {
  try {
    const conditions = {};

    if (req.query.title) conditions.title = req.query.title;
    if (req.query.cost) conditions.cost = req.query.cost;
    if (req.query.category) conditions.category = req.query.category;

    const events = await Event.find(conditions);

    if (events.length === 0) {
      res.status(404).json({
        status: 'fail',
        message: 'No events can be found...',
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: {
          events,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        event: newEvent,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      res.status(404).json({
        status: 'fail',
        message: 'Event cannot be found...',
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: {
          event,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!event) {
      res.status(404).json({
        status: 'fail',
        message: 'Event cannot be found...',
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: {
          event,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      res.status(404).json({
        status: 'fail',
        message: 'Cannot find event to be deleted!',
      });
    } else {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err,
    });
  }
};
