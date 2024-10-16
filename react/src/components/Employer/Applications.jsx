import React, { useEffect, useState } from 'react';
import { useAuth } from "../../context/authContext";

const Applications = () => {
  const user = useAuth(); // Assuming this gives you the authenticated user details
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch employer ID by user ID
  const fetchEmployerId = async () => {
    try {
      const response = await fetch(`http://localhost:8080/employer/getEmployerByUserId/${user._id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch employer information');
      }
      const employerData = await response.json();
      console.log(employerData)
      return employerData._id; // Assuming the API response contains the employerId
    } catch (err) {
      throw new Error('Error fetching employer information');
    }
  };

  // Function to fetch applications based on employerId
  const fetchApplications = async (employerId) => {
    try {
      const response = await fetch(`http://localhost:8080/appliedJob/getApplications/${employerId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }
      const data = await response.json();
      setApplications(data.applications);
    } catch (err) {
      throw new Error('Error fetching applications');
    }
  };

  useEffect(() => {
    const loadApplications = async () => {
      try {
        setLoading(true);
        
        // Step 1: Fetch employerId using userId
        const employerId = await fetchEmployerId();
        
        // Step 2: Fetch applications using employerId
        await fetchApplications(employerId);
        
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, [user._id]); // Dependency on user._id

  if (loading) {
    return <p>Loading applications...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Job Applications</h1>
      {applications.length === 0 ? (
        <p>No applications found for your posted jobs.</p>
      ) : (
        <div className="application-list">
          {applications.map((application) => (
            <div key={application._id} className="application-card">
              <h3>
                {application.jobSeekerId.firstName} {application.jobSeekerId.lastName}
              </h3>
              <p>
                Applied for: <strong>{application.jobId.title}</strong>
              </p>
              <p>Status: {application.status}</p>
              <p>Applied on: {new Date(application.appliedDate).toLocaleDateString()}</p>
              <p>
                <a href={application.resume} target="_blank" rel="noopener noreferrer">
                  View Resume
                </a>
              </p>
              <p>Cover Letter: {application.coverLetter}</p>
              <p>Source: {application.source}</p>
              {application.notes && <p>Notes: {application.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
