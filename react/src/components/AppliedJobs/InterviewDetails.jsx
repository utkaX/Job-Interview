import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaLink,
  FaClipboardList,
  FaUser,
} from "react-icons/fa";
import { useAuth } from "../../context/authContext"; // Import useAuth to access user details

import { useSocket } from "../../context/Socket";

const InterviewDetails = () => {
  const { socket } = useSocket();

  const { user } = useAuth(); // Destructure user from authContext to get the email
  const [interviewDetails, setInterviewDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const appliedJob = location.state?.appliedJob || null;
  const navigate = useNavigate(); // Use navigate for redirection

  useEffect(() => {
    const fetchInterviewDetails = async () => {
      if (!appliedJob) return; // Check if appliedJob is available

      try {
        const response = await fetch(
          `http://localhost:8080/interview/appliedJob/${appliedJob._id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch interview details");
        }
        const data = await response.json();
        setInterviewDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviewDetails();
  }, [appliedJob]);

  const handleRoomJoined = ({ roomId }) => {
    navigate(`/interview?email=${user.email}&roomId=${roomId}`);
  };
  useEffect(() => {
    socket.on("joined-room", handleRoomJoined);
    return ()=>{
    socket.off('joined-room', handleRoomJoined);
    }

  }, [socket,handleRoomJoined]);

  const handleJoinInterview = () => {
    if (interviewDetails && interviewDetails.roomId) {
      socket.emit("join-room", {
        email: user.email,
        roomId: interviewDetails.roomId,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Loading interview details...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  if (!interviewDetails) {
    return <div className="text-center">No interview details available.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Interview Details for Application ID: {appliedJob._id}
      </h2>

      <div className="mb-6 flex items-center p-4 border-l-4 border-blue-500 bg-white shadow-md rounded-md">
        <FaCalendarAlt className="text-blue-500 mr-3" size={24} />
        <div>
          <p className="text-md font-semibold">Interview Date:</p>
          <p className="text-lg text-gray-700">
            {new Date(interviewDetails.interviewDateTime).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mb-6 flex items-center p-4 border-l-4 border-blue-500 bg-white shadow-md rounded-md">
        <FaMapMarkerAlt className="text-blue-500 mr-3" size={24} />
        <div>
          <p className="text-md font-semibold">Location:</p>
          <p className="text-lg text-gray-700">
            {interviewDetails.location || "Online"}
          </p>
        </div>
      </div>

      <div className="mb-6 flex items-center p-4 border-l-4 border-blue-500 bg-white shadow-md rounded-md">
        <FaClipboardList className="text-blue-500 mr-3" size={24} />
        <div>
          <p className="text-md font-semibold">Interview Type:</p>
          <p className="text-lg text-gray-700">
            {interviewDetails.interviewMode || "Unknown"}
          </p>
        </div>
      </div>

      {interviewDetails.interviewMode === "online" && (
        <div className="mb-6 flex items-center p-4 border-l-4 border-blue-500 bg-white shadow-md rounded-md">
          <FaLink className="text-blue-500 mr-3" size={24} />
          <div>
            <p className="text-md font-semibold">Interview Link:</p>
            <a
              href={interviewDetails.interviewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:bg-blue-100 hover:underline px-2 py-1 rounded transition duration-200"
            >
              {interviewDetails.interviewLink}
            </a>
          </div>
        </div>
      )}

      <div className="mb-6 flex items-center p-4 border-l-4 border-blue-500 bg-white shadow-md rounded-md">
        <FaClipboardList className="text-blue-500 mr-3" size={24} />
        <div>
          <p className="text-md font-semibold">Instructions:</p>
          <p className="text-lg text-gray-700">
            {interviewDetails.instructions ||
              "No specific instructions provided"}
          </p>
        </div>
      </div>

      <div className="mb-6 flex items-center p-4 border-l-4 border-blue-500 bg-white shadow-md rounded-md">
        <FaUser className="text-blue-500 mr-3" size={24} />
        <div>
          <p className="text-md font-semibold">Interviewers:</p>
          <p className="text-lg text-gray-700">
            {interviewDetails.interviewers.length > 0
              ? interviewDetails.interviewers.join(", ")
              : "No interviewers assigned"}
          </p>
        </div>
      </div>

      <div className="mb-6 flex items-center p-4 border-l-4 border-blue-500 bg-white shadow-md rounded-md">
        <FaClipboardList className="text-blue-500 mr-3" size={24} />
        <div>
          <p className="text-md font-semibold">Feedback:</p>
          <p className="text-lg text-gray-700">
            {interviewDetails.feedback || "No feedback provided"}
          </p>
        </div>
      </div>

      {interviewDetails.interviewMode === "online" && (
        <button
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={handleJoinInterview}
        >
          Join Interview Room
        </button>
      )}
    </div>
  );
};

export default InterviewDetails;
