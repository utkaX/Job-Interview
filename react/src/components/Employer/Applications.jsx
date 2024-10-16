import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import ApplicationCard from "./ApplicationCard"; // Import the new ApplicationCard component
import Sidebar from "./Sidebar";

const Applications = () => {
  const user = useAuth(); 
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployerId = async () => {
    try {
      const response = await fetch(`http://localhost:8080/employer/getEmployerByUserId/${user.user._id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch employer information');
      }
      const employerData = await response.json();
      return employerData._id;
    } catch (err) {
      throw new Error('Error fetching employer information');
    }
  };

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
        const employerId = await fetchEmployerId();
        await fetchApplications(employerId);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, [user.user._id]);

  if (loading) {
    return <p className="text-center mt-4">Loading applications...</p>;
  }

  if (error) {
    return <p className="text-center mt-4 text-red-600">{error}</p>;
  }

  return (
    <div className="flex">
      <Sidebar/>
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Job Applications</h1>
      {applications.length === 0 ? (
        <p className="text-center text-gray-600">No applications found</p>
      ) : (
        <div className="application-list grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((application) => (
            <ApplicationCard key={application._id} application={application} />
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default Applications;
