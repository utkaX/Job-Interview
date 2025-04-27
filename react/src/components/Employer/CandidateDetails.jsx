import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "./Layout";
import config from "../../utils/config";


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
  }, [jobId]); 

  return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Job Candidates
        </h1>

      
        {!loading && candidates.length === 0 && (
          <p className="text-gray-600">No candidates found.</p>
        )}
        {!loading && candidates.length > 0 && (
          <div className="space-y-6">
            {candidates.map((candidate) => (
              <div
                key={candidate._id}
                className="bg-white shadow-md rounded-lg p-6"
              >

                <div className="text-sm text-gray-600 mb-4">
                  <p>
                    <strong>Status:</strong> {candidate.status}
                  </p>
                  <p>
                    <strong>Application Type:</strong>{" "}
                    {candidate.applicationType}
                  </p>
                  <p>
                    <strong>Source:</strong> {candidate.source}
                  </p>
                  <p>
                    <strong>Notes:</strong> {candidate.notes}
                  </p>
                  <p>
                    <strong>Cover Letter:</strong> {candidate.coverLetter}
                  </p>
                  <p>
                    <strong>Resume:</strong>{" "}
                    <a
                      href={candidate.jobSeekerId?.resume}
                      className="text-blue-500 underline"
                    >
                      Download Resume
                    </a>
                  </p>
                  <p>
                    <strong>Applied Date:</strong>{" "}
                    {new Date(candidate.appliedDate).toLocaleDateString()}
                  </p>
                  {candidate.reviewDate && (
                    <p>
                      <strong>Review Date:</strong>{" "}
                      {new Date(candidate.reviewDate).toLocaleDateString()}
                    </p>
                  )}
                  {candidate.followUpDate && (
                    <p>
                      <strong>Follow Up Date:</strong>{" "}
                      {new Date(candidate.followUpDate).toLocaleDateString()}
                    </p>
                  )}
                  <p>
                    <strong>Created At:</strong>{" "}
                    {new Date(candidate.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Updated At:</strong>{" "}
                    {new Date(candidate.updatedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-xs text-gray-500">
                  <p>
                    <strong>ID:</strong> {candidate._id}
                  </p>
                  <p>
                    <strong>Job Seeker ID:</strong> {candidate.jobSeekerId?._id}
                  </p>
                  <p>
                    <strong>Job ID:</strong> {candidate.jobId}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
  );
};

export default JobCandidates;
