const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Evenet must have a title!'],
    minLength: [2, 'An Event must be at least 2 characters long'],
    trim: true,
  },
  cost: {
    type: Number,
    min: [1, 'Event cost must be greater than 0'],
    trim: true,
  },
  category: {
    type: String,
    required: [
      true,
      'Event must have a cateogory of: business, casual, party or general',
    ],
    enum: ['business', 'casual', 'party', 'other'],
    lowercase: true,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
