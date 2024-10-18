import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import { useAuth } from "../../context/authContext";

const UpdateInterviewDetails = () => {
  const { id } = useParams(); // Getting the job ID from URL
  const { user } = useAuth(); // Getting user from context

  const [appliedJobId, setAppliedJobId] = useState(id); // Set initial applied job ID
  const [employerId, setEmployerId] = useState(""); // Employer ID from API
  const [interviewMode, setInterviewMode] = useState("online"); // Initial interview mode
  const [interviewDateTime, setInterviewDateTime] = useState("");
  const [interviewLink, setInterviewLink] = useState("");
  const [address, setAddress] = useState("");
  const [feedback, setFeedback] = useState("");
  const [interviewers, setInterviewers] = useState(["", ""]); // Array of interviewers
  const [successMessage, setSuccessMessage] = useState("");
  const [roomId, setRoomId] = useState(""); // Room ID for online interviews

  // Generate Room ID (6 characters)
  const generateRoomId = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  // Set roomId when the component mounts
  useEffect(() => {
    setRoomId(generateRoomId());
  }, []);

  // Fetch Employer ID based on the user ID
  useEffect(() => {
    const fetchEmployerId = async () => {
      if (user && user._id) {
        try {
          const response = await fetch(
            `http://localhost:8080/employer/getEmployerByUserId/${user._id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch employer ID");
          }
          const data = await response.json();
          if (data && data._id) {
            setEmployerId(data._id);
          }
        } catch (error) {
          console.error("Error fetching employer ID:", error);
        }
      }
    };

    fetchEmployerId();
  }, [user]);

  // Handle Interviewer Field Changes
  const handleInterviewersChange = (index, value) => {
    const newInterviewers = [...interviewers];
    newInterviewers[index] = value;
    setInterviewers(newInterviewers);
  };

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const interviewDetails = {
      appliedJobId,
      employerId,
      interviewMode,
      interviewDateTime,
      interviewLink,
      roomId,
      address,
      feedback,
      interviewers,
    };

    try {
      const response = await fetch("http://localhost:8080/interview/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(interviewDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to update interview details");
      }

      setSuccessMessage("Interview details updated successfully!");
      handleClear(); // Clear fields after submission
    } catch (error) {
      console.error("Error updating interview details:", error);
      setSuccessMessage("Error updating interview details.");
    }
  };

  // Clear Form Fields after Submission
  const handleClear = () => {
    setAppliedJobId(id); // Reset to initial job ID from URL params
    setEmployerId("");
    setInterviewDateTime("");
    setInterviewLink("");
    setRoomId(generateRoomId()); // Reset roomId to a new value
    setAddress("");
    setFeedback("");
    setInterviewers(["", ""]);
    setSuccessMessage("");
  };

  return (
    <Layout>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">
          Update Interview Details
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Interview Mode Field */}
          <div className="mb-5">
            <label className="font-semibold">Interview Mode:</label>
            <div>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  value="online"
                  checked={interviewMode === "online"}
                  onChange={() => setInterviewMode("online")}
                  className="mr-2"
                />
                Online
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="offline"
                  checked={interviewMode === "offline"}
                  onChange={() => setInterviewMode("offline")}
                  className="mr-2"
                />
                Offline
              </label>
            </div>
          </div>

          {/* Conditional fields based on interview mode */}
          {interviewMode === "online" && (
            <div className="mb-5">
              <label className="font-semibold">Zoom Meeting Link:</label>
              <input
                type="text"
                value={interviewLink}
                onChange={(e) => setInterviewLink(e.target.value)}
                className="border border-blue-300 rounded p-3 w-full focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          )}

          {interviewMode === "offline" && (
            <div className="mb-5">
              <label className="font-semibold">Address:</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border border-blue-300 rounded p-3 w-full focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          )}

          {/* Date and Time Field */}
          <div className="mb-5">
            <label className="font-semibold">Interview Date & Time:</label>
            <input
              type="datetime-local"
              value={interviewDateTime}
              onChange={(e) => setInterviewDateTime(e.target.value)}
              className="border border-blue-300 rounded p-3 w-full focus:outline-none focus:border-blue-500 transition"
              required
            />
          </div>

          {/* Feedback Field */}
          <div className="mb-5">
            <label className="font-semibold">Feedback:</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="border border-blue-300 rounded p-3 w-full focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Interviewers Fields */}
          <div className="mb-5">
            <label className="font-semibold">Interviewers:</label>
            {interviewers.map((interviewer, index) => (
              <input
                key={index}
                type="text"
                value={interviewer}
                onChange={(e) =>
                  handleInterviewersChange(index, e.target.value)
                }
                className="border border-blue-300 rounded p-3 w-full mb-2 focus:outline-none focus:border-blue-500 transition"
                placeholder={`Interviewer ${index + 1} Name`}
              />
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded w-full hover:bg-blue-600 transition"
          >
            Update Interview
          </button>

          {/* Success Message */}
          {successMessage && (
            <p className="text-green-500 mt-4">{successMessage}</p>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default UpdateInterviewDetails;
