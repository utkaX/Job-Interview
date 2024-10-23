const Notification = require("../models/notification"); 
const { response } = require("express");
const Job = require('../models/job'); // Import your Job model
const JobSeeker = require('../models/jobseeker');

exports.createNotification = async (req, res) => {
    try {
        const notification = new Notification(req.body);
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllNotification = async (req, res) => {
    try {
        const notifications = await Notification.find()
            .populate('userId')
            .populate('jobType');
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getNotificationById = async (req, res) => {
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

exports.getNotificationsByUserId = async (req, res) => {
    const userId = req.params.id;

    try {
        const notifications = await Notification.find({ userId }).sort({ timestamp: -1 });

        if (!notifications || notifications.length === 0) {
            return res.status(404).json({ message: 'No notifications found for this user.' });
        }

        return res.status(200).json(notifications); // Return the notifications array
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.searchByJobSeekerId = async (req, res) => {
    const jobSeekerId = req.params.jobSeekerId; // Extract job seeker ID from request parameters

    try {
        const notifications = await Notification.find({ jobSeekerId })
            .sort({ timestamp: -1 }); // You can adjust the sorting as needed

        if (!notifications || notifications.length === 0) {
            return res.status(404).json({ message: 'No notifications found for this job seeker.' });
        }

        return res.status(200).json(notifications); // Return the notifications array
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.updateNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!notification) return res.status(404).json({ error: 'Notification not found' });
        res.status(200).json(notification);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);
        if (!notification) return res.status(404).json({ error: 'Notification not found' });
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createNotificationsForJob = async (req, res) => {
    const { jobId, jobCategory } = req.body;

    try {
        // Find all job seekers who have this job category in their preferences
        const jobSeekers = await JobSeeker.find({
            jobTypePreferences: jobCategory,
        });

        const notifications = jobSeekers.map((jobSeeker) => ({
            jobSeekerId: jobSeeker._id,
            jobId: jobId,
            message: `New job posted in your preferred category: ${jobCategory}`,
        }));

        // Save all notifications in the database
        await Notification.insertMany(notifications);
        res.status(201).json({ message: 'Notifications created for job seekers successfully.' });
    } catch (error) {
        console.error('Error creating notifications:', error);
        res.status(500).json({ error: error.message });
    }
};
