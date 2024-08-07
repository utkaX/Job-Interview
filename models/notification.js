const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let User = require("../models/user.js");

const notificationSchema = new Schema({
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    isRead: {
        type: Boolean,
        default: false
    },

    alert: {
        type: Boolean,
        default: false
    }, // Indicates whether the notification should trigger an alert
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    }, // Priority level
    category: {
        type: String
    }, // Category of notification (e.g., "application", "interview", "system")
    jobType: {
        type: Schema.Types.ObjectId,
        ref: 'JobType'
    } // Job type related to the notification
},
    { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);