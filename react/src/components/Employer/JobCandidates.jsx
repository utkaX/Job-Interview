// JobCandidates.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import CandidateInfo from "./CandidateInfo";
import config from "../../utils/config";
// Function to handle status update API call
const onStatusUpdate = async (appliedJobId, status) => {
  const response = await fetch(
    `${config.baseUrl}/appliedJob/update/${appliedJobId}`,
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

const JobCandidates = () => {
  const { jobId } = useParams(); // Get jobId from the URL
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch candidates who applied for the job
  const fetchCandidates = async () => {
    try {
      const response = await fetch(
        `${config.baseUrl}/appliedJob/getAppliedJob/${jobId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch candidates.");
      }
      const data = await response.json();
      setCandidates(data); // Store fetched candidates in state
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [jobId]); // Fetch candidates when jobId changes

  // Handle status update from CandidateInfo
  const handleStatusUpdate = async (appliedJobId, status) => {
    try {
      const updatedCandidate = await onStatusUpdate(appliedJobId, status);
      // Update the candidate status in the local state
      setCandidates((prevCandidates) =>
        prevCandidates.map((candidate) =>
          candidate._id === appliedJobId ? { ...candidate, status } : candidate
        )
      );
      return updatedCandidate;
    } catch (error) {
      console.error("Error updating candidate status:", error);
    }
  };

  return (
    <Layout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Job Candidates
        </h1>

        {loading && <p className="text-gray-600">Loading candidates...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && candidates.length === 0 && (
          <p className="text-gray-600">No candidates found.</p>
        )}

        {!loading && candidates.length > 0 && (
          <div className="space-y-6">
            {candidates.map((candidate) => (
              <CandidateInfo
                key={candidate._id}
                candidate={candidate}
                onStatusUpdate={handleStatusUpdate} // Pass the status update handler
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default JobCandidates;
