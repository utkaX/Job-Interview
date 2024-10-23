// NotificationItem.js
import React from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const NotificationItem = ({ notification }) => {
  const company = "company";

  
  

  return (
    <div
      className={`mb-4 p-4 border-l-4 rounded-lg transition ${
        notification.isRead
          ? "border-green-500 bg-green-50"
          : "border-red-500 bg-red-50"
      }`}
    >
      <p className="text-gray-800 font-semibold">{notification.message}</p>
      <p className="text-gray-500 text-sm">
        {new Date(notification.createdAt).toLocaleString()}
      </p>

      {/* Link to JobDetails page */}
      <div className="flex justify-end mt-6">
        <Link
          to={`/JobDetails/${notification.jobId._id}?company=${company}&companyId=${notification.employerId}`}
          state={{ company, companyId: notification.employerId }}
          className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-md shadow"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default NotificationItem;
