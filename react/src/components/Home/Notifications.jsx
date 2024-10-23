import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import NotificationItem from "./NotificationItem"; // Ensure correct import
import AuthButtons from "./AuthButtons"; // Import your AuthButtons component

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobSeeker, setJobSeeker] = useState(null);

  // Fetch job seeker details
  const fetchJobSeeker = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/jobSeeker/getJobSeekerById/${userId}`
      ); // Use userId parameter
      if (!response.ok) throw new Error("Failed to fetch job seeker");
      const data = await response.json();
      setJobSeeker(data);
    } catch (error) {
      console.error("Error fetching job seeker:", error);
      setError("Failed to load job seeker details.");
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchJobSeeker(user._id); // Fetch job seeker with user ID
    }
  }, [user]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!jobSeeker) return; // Don't fetch notifications if jobSeeker is not set
      setLoading(true);

      try {
        const response = await fetch(
          `http://localhost:8080/notification/searchByJobSeekerId/${jobSeeker._id}` // Use jobSeeker ID
        );
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setError("Failed to load notifications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications(); // Call fetchNotifications when jobSeeker changes
  }, [jobSeeker]);

  const deleteNotification = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/notification/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete notification");
      }
      setNotifications(
        notifications.filter((notification) => notification._id !== id)
      ); // Remove deleted notification from state
    } catch (error) {
      console.error("Error deleting notification:", error);
      setError("Failed to delete notification.");
    }
  };

  return (
    <div className="p-8 bg-gray-50">
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Notifications
      </h2>
      <div className="bg-white shadow-lg rounded-lg p-6">
        {!user ? ( // Check if user is logged in
          <AuthButtons /> // Render Auth buttons if not logged in
        ) : loading ? (
          <p className="text-gray-600 text-center">Loading notifications...</p>
        ) : error ? (
          <p className="text-red-600 text-center">{error}</p>
        ) : notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              onDelete={deleteNotification} // Pass delete function
            />
          ))
        ) : (
          <p className="text-gray-600 text-center">
            No notifications available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
