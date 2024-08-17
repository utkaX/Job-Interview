const notification = require("../models/notification"); 
const { response } = require("express");



exports.createNotification= async (req, res) => {
    try {
        const notification = new Notification(req.body);
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllNotification=async (req, res) => {
    try {
        const notifications = await Notification.find()
            .populate('userId')
            .populate('jobType');
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getNotificationById=async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id)
            .populate('userId')
            .populate('jobType');
        if (!notification) return res.status(404).json({ error: 'Notification not found' });
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateNotification=async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!notification) return res.status(404).json({ error: 'Notification not found' });
        res.status(200).json(notification);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteNotification= async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);
        if (!notification) return res.status(404).json({ error: 'Notification not found' });
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};