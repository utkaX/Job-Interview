import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`http://localhost:8080/notification/getNotificationsByUserId/${user._id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if (user && user._id) {
      fetchNotifications();
    }
  }, [user]);

  return (
    <div className="p-8 bg-gray-50">
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Notifications</h2>
      <div className="bg-white shadow-lg rounded-lg p-6">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification._id} className="mb-4 p-4 border border-gray-200 rounded-lg">
              <p className="text-gray-800">{notification.message}</p>
              {notification.jobId && <p className="text-gray-600">Job Title: {notification.jobTitle}</p>}
              <p className="text-gray-500 text-sm">{new Date(notification.createdAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No notifications available.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
