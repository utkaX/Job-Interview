const Event = require("../models/event");
const { response } = require("express");


exports.createEvent=async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
          // If the body is an array, use insertMany
          const events = await Event.insertMany(req.body);
          res.status(201).json(events);
        } else {
          // If the body is a single event
          const newEvent = new Event(req.body);
          const savedEvent = await newEvent.save();
          res.status(201).json(savedEvent);
        }
      } catch (error) {
        res.status(400).json({ message: 'Error creating event(s)', error });
      }
};


exports.getAllEvent=async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
      } catch (error) {
        res.status(400).json({ message: 'Error fetching events', error });
      }
}


exports.getEventById= async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
      } catch (error) {
        res.status(400).json({ message: 'Error fetching event', error });
      }
}


exports.updateEventById=async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) {
          return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(updatedEvent);
      } catch (error) {
        res.status(400).json({ message: 'Error updating event', error });
      }
}

exports.deleteEventById=async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
          return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
      } catch (error) {
        res.status(400).json({ message: 'Error deleting event', error });
      }
}
