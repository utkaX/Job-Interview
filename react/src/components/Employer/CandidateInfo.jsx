import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CandidateInfo = ({ candidate, onStatusUpdate }) => {
  const [status, setStatus] = useState(candidate.status);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const navigate = useNavigate(); // Create navigate function

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setIsButtonEnabled(newStatus !== ""); // Enable button if status is selected
  };

  const handleUpdateStatus = async () => {
    if (isButtonEnabled) {
      try {
        const response = await onStatusUpdate(candidate._id, status);
        if (status === "Shortlisted") { // Check for the correct status
          navigate(`/update-interview-details/${candidate._id}`); // Navigate to interview details page
        }
        setIsButtonEnabled(false);
      } catch (error) {
        console.error("Error updating status:", error);
      }
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        {candidate.jobSeekerId?.firstName} {candidate.jobSeekerId?.lastName}
      </h2>
      <div className="text-md text-gray-700 mb-6">
        <div className="flex justify-between border-b pb-2 mb-4">
          <span className="font-semibold">Status:</span>
          <span className="text-green-500">{candidate.status}</span>
        </div>
        <div className="flex justify-between border-b pb-2 mb-4">
          <span className="font-semibold">Application Type:</span>
          <span className="text-gray-600">{candidate.applicationType}</span>
        </div>
        <div className="flex justify-between border-b pb-2 mb-4">
          <span className="font-semibold">Source:</span>
          <span className="text-gray-600">{candidate.source}</span>
        </div>
        <div className="flex justify-between border-b pb-2 mb-4">
          <span className="font-semibold">Notes:</span>
          <span className="text-gray-600">{candidate.notes}</span>
        </div>
        <div className="flex justify-between border-b pb-2 mb-4">
          <span className="font-semibold">Cover Letter:</span>
          <span className="text-gray-600">{candidate.coverLetter}</span>
        </div>
        <div className="flex justify-between border-b pb-2 mb-4">
          <span className="font-semibold">Resume:</span>
          <span className="text-blue-600">
            <a
              href={candidate.jobSeekerId?.resume}
              className="underline hover:text-blue-800 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume
            </a>
          </span>
        </div>
        <div className="flex justify-between border-b pb-2 mb-4">
          <span className="font-semibold">Applied Date:</span>
          <span className="text-gray-600">
            {new Date(candidate.appliedDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <label className="font-semibold">Update Status:</label>
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="border rounded p-2"
        >
          <option value="Applied">Select Status</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <button
        onClick={handleUpdateStatus}
        disabled={!isButtonEnabled}
        className={`bg-blue-600 text-white rounded p-2 hover:bg-blue-700 transition ${
          !isButtonEnabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Update Status
      </button>

      {/* <div className="text-xs text-gray-500 mt-4">
        <p>
          <strong>ID:</strong> <span>{candidate._id}</span>
        </p>
        <p>
          <strong>Job ID:</strong> <span>{candidate.jobId}</span>
        </p>
        <p>
          <strong>Location:</strong>{" "}
          <span>{candidate.jobSeekerId?.location}</span>
        </p>
        <p>
          <strong>Contact Email:</strong>{" "}
          <span>{candidate.jobSeekerId?.contactEmail}</span>
        </p>
        <p>
          <strong>Contact Phone:</strong>{" "}
          <span>{candidate.jobSeekerId?.contactPhone}</span>
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          <span>{new Date(candidate.createdAt).toLocaleString()}</span>
        </p>
        <p>
          <strong>Updated At:</strong>{" "}
          <span>{new Date(candidate.updatedAt).toLocaleString()}</span>
        </p>
      </div> */}
    </div>
  );
};

// Function to handle status update API call
const onStatusUpdate = async (appliedJobId, status) => {
  const response = await fetch(
    `http://localhost:8080/appliedJob/update/${appliedJobId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update status");
  }

  return await response.json();
};

export default CandidateInfo;
