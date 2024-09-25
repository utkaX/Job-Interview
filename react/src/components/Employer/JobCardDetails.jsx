import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const JobCardDetails = () => {
  const { id } = useParams(); // Get job ID from the URL params
  const [jobDetails, setJobDetails] = useState(null); // State to hold job details
  const [jobType, setJobType] = useState(''); // State to hold job type name
  const [loading, setLoading] = useState(true); // Loading state
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [updatedJobDetails, setUpdatedJobDetails] = useState({}); // State to hold updated job details

  // Fetch job details from the API
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/jobs/getJobById/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }
        const data = await response.json();
        setJobDetails(data); // Set fetched data into state
        setUpdatedJobDetails(data); // Initialize updated details

        // Fetch job type by jobType ID
        const jobTypeResponse = await fetch(`http://localhost:8080/jobtype/getJobTypeById/${data.jobType}`);
        if (!jobTypeResponse.ok) {
          throw new Error('Failed to fetch job type');
        }
        const jobTypeData = await jobTypeResponse.json();
        setJobType(jobTypeData.title); // Set the job type name into state

        setLoading(false); // Turn off loading state
      } catch (error) {
        console.error('Error fetching job details:', error);
        setLoading(false); // Turn off loading state even if there's an error
      }
    };

    if (id) {
      fetchJobDetails();
    } else {
      setLoading(false); // If id is null, stop loading
    }
  }, [id]); // Runs this effect when id changes

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedJobDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Function to handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/jobs/updateJobById/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedJobDetails),
      });
      if (!response.ok) {
        throw new Error('Failed to update job details');
      }
      const updatedData = await response.json();
      setJobDetails(updatedData); // Update state with new job details
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error('Error updating job details:', error);
    }
  };

  // Display loading message while fetching data
  if (loading) {
    return <div className="text-center text-gray-500">Loading job details...</div>;
  }

  // Check if job details are available
  if (!jobDetails) {
    return <div className="text-center text-gray-500">No job details found.</div>;
  }

  // Display the job details or update form
  return (
    <div className="p-6 border border-gray-300 rounded-lg shadow-lg bg-white max-w-2xl mx-auto my-10">
      <h2 className="text-3xl font-bold mb-4 text-gray-800 border-b pb-2 border-gray-300">Job Details</h2>

      {isEditing ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-gray-700">Title:</label>
            <input
              type="text"
              name="title"
              value={updatedJobDetails.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Description:</label>
            <textarea
              name="description"
              value={updatedJobDetails.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Location:</label>
            <input
              type="text"
              name="location"
              value={updatedJobDetails.location}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Category:</label>
            <input
              type="text"
              name="category"
              value={updatedJobDetails.category}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Salary:</label>
            <input
              type="number"
              name="salary"
              value={updatedJobDetails.salary}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Requirements:</label>
            <textarea
              name="requirements"
              value={updatedJobDetails.requirements.join(', ')}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Responsibilities:</label>
            <textarea
              name="responsibilities"
              value={updatedJobDetails.responsibilities.join(', ')}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Benefits:</label>
            <textarea
              name="benefits"
              value={updatedJobDetails.benefits.join(', ')}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Job Tags:</label>
            <textarea
              name="jobTags"
              value={updatedJobDetails.jobTags.join(', ')}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Company Culture:</label>
            <textarea
              name="companyCulture"
              value={updatedJobDetails.companyCulture}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Update Job
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <h3 className="text-2xl font-semibold mb-2">{jobDetails.title}</h3>
          <p className="text-gray-700 mb-4">{jobDetails.description}</p>

          <div className="mb-4">
            <strong className="text-gray-800">Location:</strong> <span className="text-gray-600">{jobDetails.location}</span>
          </div>

          <div className="mb-4">
            <strong className="text-gray-800">Category:</strong> <span className="text-gray-600">{jobDetails.category}</span>
          </div>

          <div className="mb-4">
            <strong className="text-gray-800">Job Type:</strong> <span className="text-gray-600">{jobType || 'Loading...'}</span>
          </div>

          <div className="mb-4">
            <strong className="text-gray-800">Salary:</strong> <span className="text-gray-600">${jobDetails.salary}</span>
          </div>

          <div className="mb-4">
            <strong className="text-gray-800">Status:</strong> 
            <span className={`font-bold ${jobDetails.isLive ? 'text-green-600' : 'text-red-600'}`}>
              {jobDetails.isLive ? 'Live' : 'Not Live'}
            </span>
          </div>

          <div className="mb-4">
            <strong className="text-gray-800">Posted Date:</strong> <span className="text-gray-600">{new Date(jobDetails.postedDate).toLocaleDateString()}</span>
          </div>

          <div className="mb-4">
            <strong className="text-gray-800">Requirements:</strong>
            <ul className="list-disc pl-5">
              {jobDetails.requirements.map((req, index) => (
                <li key={index} className="text-gray-600">{req}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <strong className="text-gray-800">Responsibilities:</strong>
            <ul className="list-disc pl-5">
              {jobDetails.responsibilities.map((resp, index) => (
                <li key={index} className="text-gray-600">{resp}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <strong className="text-gray-800">Benefits:</strong>
            <ul className="list-disc pl-5">
              {jobDetails.benefits.map((benefit, index) => (
                <li key={index} className="text-gray-600">{benefit}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <strong className="text-gray-800">Job Tags:</strong>
            <span className="text-gray-600">{jobDetails.jobTags.join(', ')}</span>
          </div>

          <div className="mb-4">
            <strong className="text-gray-800">Company Culture:</strong>
            <span className="text-gray-600">{jobDetails.companyCulture}</span>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md"
          >
            Edit Job
          </button>
        </div>
      )}
    </div>
  );
};

export default JobCardDetails;
