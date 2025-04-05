import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import config from "../../utils/config";
const PostJob = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [jobData, setJobData] = useState({
    employerId: "",
    userId: "",
    title: "",
    description: "",
    location: "",
    jobType: "",
    salary: "",
    category: "",
    requirements: "",
    responsibilities: "",
    benefits: "",
    jobTags: "",
    companyCulture: "",
    Experience: "",
  });

  const fetchEmployerId = async (userId) => {
    try {
      const response = await fetch(
        `${config.baseUrl}/employer/getEmployerByUserId/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch employer data");
      }
      const data = await response.json();
      return data._id;
    } catch (error) {
      console.error("Error fetching employer data:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadEmployerId = async () => {
      if (user && user._id) {
        const employerId = await fetchEmployerId(user._id);
        if (employerId) {
          setJobData((prevState) => ({
            ...prevState,
            employerId: employerId,
            userId: user._id,
          }));
        }
      }
    };

    loadEmployerId();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const fetchJobTypeId = async (jobTypeTitle) => {
    try {
      const response = await fetch(
        `${config.baseUrl}/jobtype/getJobTypeByTitle/${jobTypeTitle}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch job type");
      }
      const data = await response.json();
      return data._id;
    } catch (error) {
      console.error("Error fetching job type ID:", error);
      return null;
    }
  };

  const notifyJobSeekers = async (jobId, jobTitle) => {
    try {
      const response = await fetch(
        `${config.baseUrl}/notification/createForJob/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jobId,
            jobCategory: jobData.category,
          }),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        console.error("Error notifying job seekers:", result);
        alert(`Error notifying job seekers: ${result.error}`);
      } else {
        console.log("Job seekers notified successfully!");
      }
    } catch (error) {
      console.error("Error sending notifications:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jobTypeId = await fetchJobTypeId(jobData.jobType);
      if (jobTypeId) {
        const updatedJobData = { ...jobData, jobType: jobTypeId };

        if (!updatedJobData.Experience) {
          alert("Experience is required.");
          return;
        }

        const response = await fetch(`${config.baseUrl}/jobs/addJob`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedJobData),
        });

        if (!response.ok) {
          const result = await response.json();
          console.error("Error adding job:", result);
          alert(`Error adding job: ${result.error}`);
          return;
        }

        const jobResult = await response.json();
        alert("Job posted successfully!");

        await notifyJobSeekers(jobResult._id, jobData.category); // Pass job ID and title
      } else {
        console.error("Job type not found");
        alert("Job type not found.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <Layout>
       <div className="max-w-7xl mx-auto p-6">
          <h2 className="text-4xl font-bold mb-6 text-center text-blue-600">
          Post a New Job
          </h2>
          </div>
      <div className="flex-1 p-8 bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-10 max-w-3xl mx-auto border border-gray-200"
        >
          {/* Job Title and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                value={jobData.title}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="e.g. Software Engineer"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={jobData.location}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="e.g. New York, NY"
                required
              />
            </div>
          </div>

          {/* Job Type and Salary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Job Type
              </label>
              <select
                name="jobType"
                value={jobData.jobType}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              >
                <option value="">Select Job Type</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="temporary">Temporary</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Salary
              </label>
              <input
                type="number"
                name="salary"
                value={jobData.salary}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="e.g. 60000"
                required
              />
            </div>
          </div>

          {/* Category and Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={jobData.category}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="e.g. IT, Marketing"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={jobData.description}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                rows="3"
                placeholder="Describe the job responsibilities"
                required
              />
            </div>
          </div>

          {/* Experience and Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Experience (Years)
              </label>
              <input
                type="number"
                name="Experience"
                value={jobData.Experience}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="e.g. 3"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Benefits
              </label>
              <textarea
                name="benefits"
                value={jobData.benefits}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                rows="3"
                placeholder="e.g. Health Insurance, 401k"
              />
            </div>
          </div>

          {/* Requirements and Responsibilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Requirements
              </label>
              <textarea
                name="requirements"
                value={jobData.requirements}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                rows="3"
                placeholder="List the job requirements"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Responsibilities
              </label>
              <textarea
                name="responsibilities"
                value={jobData.responsibilities}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                rows="3"
                placeholder="Describe the job responsibilities"
              />
            </div>
          </div>

          {/* Company Culture and Job Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Company Culture
              </label>
              <textarea
                name="companyCulture"
                value={jobData.companyCulture}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                rows="3"
                placeholder="Describe the company culture"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Job Tags
              </label>
              <input
                type="text"
                name="jobTags"
                value={jobData.jobTags}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="e.g. JavaScript, React"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-4 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default PostJob;
