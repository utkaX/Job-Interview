import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext'; // Adjust the path as needed
import Sidebar from './Sidebar';

const ManageJobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:8080/jobs/getAllJob');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const filteredJobs = data.filter(job => job.employerId === user._id); // Adjust userId based on your user object
        setJobs(filteredJobs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="flex">
    <Sidebar/>
    <div className="max-w-7xl mx-auto p-4">
  <h2 className="text-3xl font-semibold mb-6 text-center">My Jobs</h2>
  {jobs.length === 0 ? (
    <p className="text-center text-lg text-gray-500">No jobs found.</p>
  ) : (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map(job => (
        <li key={job._id} className="p-6 border border-gray-300 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-200 transform hover:scale-105">
          <h3 className="text-xl font-bold mb-2">{job.title}</h3>
          <p className="text-gray-600 mb-4">{job.description}</p>
          <div className="flex justify-between text-gray-800">
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> ${job.salary}</p>
          </div>
          <p className={`text-sm ${job.isLive ? 'text-green-500' : 'text-red-500'}`}>
            <strong>Status:</strong> {job.isLive ? 'Live' : 'Not Live'}
          </p>
          <p className="text-gray-500 mt-2">
            <strong>Posted on:</strong> {new Date(job.postedDate).toLocaleDateString()}
          </p>
        </li>
      ))}
    </ul>
  )}
</div>

    </div>
  );
};

export default ManageJobs;
