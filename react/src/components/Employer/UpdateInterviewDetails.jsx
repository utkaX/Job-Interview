import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";

const UpdateInterviewDetails = () => {
  const { id } = useParams(); // Get the candidate ID from the URL
  const [appliedJobId, setAppliedJobId] = useState(id); // Set it as the initial state
  const [interviewMode, setInterviewMode] = useState("online");
  const [interviewDateTime, setInterviewDateTime] = useState("");
  const [interviewLink, setInterviewLink] = useState("");
  const [address, setAddress] = useState("");
  const [feedback, setFeedback] = useState("");
  const [interviewers, setInterviewers] = useState(["", ""]);
  const [successMessage, setSuccessMessage] = useState("");
  const [roomId, setRoomId] = useState(generateRoomId()); // Generate Room ID on component mount

  // Function to generate a 6-character alphanumeric room ID
  function generateRoomId() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  // Optionally, fetch existing interview details for the candidate
  useEffect(() => {
    const fetchInterviewDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/interview/${id}`);
        const data = await response.json();

        // Check if data is available and populate the state
        if (data) {
          setInterviewMode(data.interviewMode || "online");
          setInterviewDateTime(data.interviewDateTime || "");
          setInterviewLink(data.interviewLink || "");
          setAddress(data.address || "");
          setFeedback(data.feedback || "");
          setInterviewers(data.interviewers || ["", ""]);
          // Only set roomId if not already set (to keep generated value)
          if (!roomId) {
            setRoomId(data.roomId || generateRoomId());
          }
        }
      } catch (error) {
        console.error("Error fetching interview details:", error);
      }
    };

    fetchInterviewDetails();
  }, [id]);

  const handleInterviewersChange = (index, value) => {
    const newInterviewers = [...interviewers];
    newInterviewers[index] = value;
    setInterviewers(newInterviewers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const interviewDetails = {
      appliedJobId,
      interviewMode,
      interviewDateTime,
      interviewLink,
      roomId, // Auto-generated Room ID
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
      setAppliedJobId("");
      setInterviewDateTime("");
      setInterviewLink("");
      setRoomId(generateRoomId()); // Generate new Room ID for future submissions
      setAddress("");
      setFeedback("");
      setInterviewers(["", ""]);
    } catch (error) {
      console.error("Error updating interview details:", error);
      setSuccessMessage("Error updating interview details.");
    }
  };

  const handleClear = () => {
    setAppliedJobId("");
    setInterviewDateTime("");
    setInterviewLink("");
    setRoomId(generateRoomId()); // Generate new Room ID
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

          {interviewMode === "online" && (
            <>
              <div className="mb-5">
                <label className="font-semibold">Zoom Meeting Link:</label>
                <input
                  type="text"
                  value={interviewLink}
                  onChange={(e) => setInterviewLink(e.target.value)}
                  className="border border-blue-300 rounded p-3 w-full focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            </>
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

          <div className="mb-5">
            <label className="font-semibold">Feedback:</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="border border-blue-300 rounded p-3 w-full focus:outline-none focus:border-blue-500 transition"
            />
          </div>

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

          <button
            type="submit"
            className="bg-blue-600 text-white rounded p-3 hover:bg-blue-700 transition duration-200 w-full"
          >
            Update Interview Details
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-300 text-black rounded p-3 hover:bg-gray-400 transition duration-200 w-full mt-3"
          >
            Clear Fields
          </button>
        </form>
        {successMessage && (
          <p className="text-green-600 font-semibold mt-4">{successMessage}</p>
        )}
      </div>
    </Layout>
  );
};

export default UpdateInterviewDetails;
