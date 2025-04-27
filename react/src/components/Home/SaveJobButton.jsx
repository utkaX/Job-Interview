import React, { useState, useEffect } from "react";
import { FaBookmark } from "react-icons/fa";
import { useAuth } from "../../context/authContext";
import config from "../../utils/config";

const SaveJobButton = ({ jobId }) => {
  const { user, isLoggedIn } = useAuth();
  const [jobSeeker, setJobSeeker] = useState(null);
  const [isJobSaved, setIsJobSaved] = useState(false);

  const fetchJobSeeker = async () => {
    if (!user) return;
    try {
      const response = await fetch(
        `${config.baseUrl}/jobSeeker/getJobSeekerById/${user._id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setJobSeeker(data);
    } catch (error) {
      console.error("Error fetching job seeker data:", error);
    }
  };

  const checkSavedStatus = async () => {
    if (!jobSeeker) return;
    try {
      const response = await fetch(
        `${config.baseUrl}/jobSeeker/saved-job/${jobSeeker._id}/${jobId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setIsJobSaved(data.isSaved);
    } catch (error) {
      console.error("Error fetching saved job status:", error);
    }
  };

  useEffect(() => {
    fetchJobSeeker();
  }, [user]);

  useEffect(() => {
    checkSavedStatus();
  }, [jobSeeker, jobId]);

  const handleSaveJob = async () => {
    if (!isLoggedIn) {
      console.log("User not logged in, redirecting to login...");
      return;
    }

    const method = isJobSaved ? "DELETE" : "POST"; // Determine method based on saved status
    const url = isJobSaved
      ? `${config.baseUrl}/jobSeeker/remove-saved-job`
      : `${config.baseUrl}/jobSeeker/save-job`; // Set URL based on action

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: isJobSaved
          ? JSON.stringify({ jobSeekerId: jobSeeker._id, jobId }) // Body for DELETE request
          : JSON.stringify({ jobSeekerId: jobSeeker._id, jobId }), // Body for POST request
      });
      if (response.ok) {
        setIsJobSaved(!isJobSaved); // Toggle saved status
      } else {
        console.error("Error saving job:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  return (
    <button
      onClick={handleSaveJob}
      className={`p-2 rounded-full ${
        isJobSaved ? "text-blue-500" : "text-gray-400"
      } hover:text-blue-600 transition`}
    >
      <FaBookmark size={24} />
    </button>
  );
};

export default SaveJobButton;
