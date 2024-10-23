import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom"; // Use this to navigate
import { useSocket } from "../../context/Socket";

const InterviewSchedule = () => {
  const { user } = useAuth(); // Destructure user from useAuth
  const [employer, setEmployer] = useState(null); // State to store employer data
  const [interviews, setInterviews] = useState([]); // State to store interview data
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // Use navigate for redirection
  const { socket } = useSocket();
  console.log(socket);

  // Fetch the employer ID based on the user ID
  const fetchEmployerId = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/employer/getEmployerByUserId/${user._id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch employer information");
      }
      const employerData = await response.json();
      setEmployer(employerData);

      return employerData._id; // Return employer ID for the next request
    } catch (err) {
      console.error("Error fetching employer information:", err);
    }
  };

  // Fetch interviews for the employer
  const fetchInterviews = async (employerId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/interview/shortlistedJobs/${employerId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch interviews");
      }
      const interviewData = await response.json();
      setInterviews(interviewData); // Set interview data
      setLoading(false); // Set loading to false after data is fetched
    } catch (err) {
      console.error("Error fetching interviews:", err);
      setLoading(false);
    }
  };

  // Fetch employer ID and then interviews
  useEffect(() => {
    const getEmployerAndInterviews = async () => {
      const employerId = await fetchEmployerId();
      if (employerId) {
        fetchInterviews(employerId);
      }
    };

    if (user && user._id) {
      getEmployerAndInterviews();
    }
  }, [user]);

  const handleRoomJoined = ({ roomId }) => {
    navigate(`/interview?email=${user.email}&roomId=${roomId}`);
  };

  useEffect(() => {
    socket.on("joined-room", handleRoomJoined);
    return () => {
      socket.off("joined-room", handleRoomJoined);
    };
  }, [socket, handleRoomJoined]);

  const handleJoinInterview = (roomId) => {
    if (roomId) {
      socket.emit("join-room", {
        email: user.email,
        roomId: roomId,
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        {loading ? (
          <h1>Loading interviews...</h1>
        ) : (
          <>
           <div className="max-w-7xl mx-auto p-6">
          <h2 className="text-4xl font-bold mb-6 text-center text-blue-600">
          Interview Schedule
          </h2>
          </div>
            {interviews.length === 0 ? (
              <p>No interviews found for this employer.</p>
            ) : (
              <div className="mt-6">
                {interviews.map((interview, index) => ( 
                  <div key={index} className="bg-white p-4 mb-4 shadow rounded">
                    <p>
                      <strong>Interview ID:</strong> {interview._id}
                    </p>
                    <p>
                      <strong>Applied Job ID:</strong> {interview.appliedJobId}
                    </p>
                    <p>
                      <strong>Interview Mode:</strong> {interview.interviewMode}
                    </p>
                    <p>
                      <strong>Interview Date & Time:</strong>{" "}
                      {new Date(interview.interviewDateTime).toLocaleString()}
                    </p>
                    {interview.interviewMode === "online" && (
                      <>
                        <p>
                          <strong>Interview Link:</strong>{" "}
                          <a
                            href={interview.interviewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {interview.interviewLink}
                          </a>
                        </p>
                        <p>
                          <strong>Room ID:</strong> {interview.roomId}
                        </p>
                        {/* Button to navigate to the interview room */}
                        <button
                          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                          onClick={() => handleJoinInterview(interview.roomId)}
                        >
                          Join Interview Room
                        </button>
                      </>
                    )}
                    {interview.interviewMode === "offline" && (
                      <p>
                        <strong>Address:</strong> {interview.address || "N/A"}
                      </p>
                    )}
                    <p>
                      <strong>Feedback:</strong>{" "}
                      {interview.feedback || "No feedback yet"}
                    </p>
                    <p>
                      <strong>Interviewers:</strong>
                    </p>
                    <ul>
                      {interview.interviewers?.length > 0 ? (
                        interview.interviewers.map((interviewer, idx) => (
                          <li key={idx}>
                            {interviewer.name || "Unnamed Interviewer"}
                          </li>
                        ))
                      ) : (
                        <li>No interviewers assigned</li>
                      )}
                    </ul>
                    <p>
                      <strong>Created At:</strong>{" "}
                      {new Date(interview.createdAt).toLocaleString()}
                    </p>
                    <p>
                      <strong>Updated At:</strong>{" "}
                      {new Date(interview.updatedAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default InterviewSchedule;
