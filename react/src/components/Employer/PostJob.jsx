import React, { useState } from "react";
import { useAuth } from "../../context/authContext";

const PostJob = () => {
  const { user } = useAuth();
  const [jobData, setJobData] = useState({
    employerId: user._id,
    title: "",
    description: "",
    location: "",
    jobType: "",
    salary: "",
    category: "",
    requirements: [],
    responsibilities: [],
    benefits: [],
    jobTags: "",
    companyCulture: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const fetchJobTypeId = async (jobTypeTitle) => {
    try {
      const response = await fetch(`http://localhost:8080/jobtype/getJobTypeByTitle/${jobTypeTitle}`);
      const data = await response.json();
      return response.ok ? data._id : null;
    } catch (error) {
      console.error("Error fetching job type ID:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jobTypeId = await fetchJobTypeId(jobData.jobType);
      if (jobTypeId) {
        const updatedJobData = { ...jobData, jobType: jobTypeId };
        const response = await fetch("http://localhost:8080/jobs/addJob", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedJobData),
        });

        const result = await response.json();
        if (response.ok) {
          console.log("Job added successfully:", result);
          setJobData({
            employerId: user._id,
            title: "",
            description: "",
            location: "",
            jobType: "",
            salary: "",
            category: "",
            requirements: [],
            responsibilities: [],
            benefits: [],
            jobTags: "",
            companyCulture: "",
          });
        } else {
          console.error("Error adding job:", result);
        }
      } else {
        console.error("Job type not found");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 bg-white p-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Title and Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-2">Job Title</label>
            <input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              required
              placeholder="e.g. Software Engineer"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={jobData.location}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              required
              placeholder="e.g. New York, NY"
            />
          </div>
        </div>

        {/* Job Type and Salary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-2">Job Type</label>
            <select
              name="jobType"
              value={jobData.jobType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
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

          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-2">Salary</label>
            <input
              type="number"
              name="salary"
              value={jobData.salary}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              required
              placeholder="e.g. 60000"
            />
          </div>
        </div>

        {/* Category and Description */}
        <div className="mb-4">
          <label className="block text-gray-800 font-semibold mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={jobData.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            required
            placeholder="e.g. IT, Marketing"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={jobData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
            placeholder="Describe the job responsibilities and expectations"
          />
        </div>

        {/* Responsibilities and Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-2">Responsibilities</label>
            <textarea
              name="responsibilities"
              value={jobData.responsibilities}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="e.g. Develop applications"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-2">Requirements</label>
            <textarea
              name="requirements"
              value={jobData.requirements}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="e.g. Bachelor’s degree in relevant field"
            />
          </div>
        </div>

        {/* Benefits, Job Tags, and Company Culture */}
        <div className="mb-4">
          <label className="block text-gray-800 font-semibold mb-2">Benefits</label>
          <textarea
            name="benefits"
            value={jobData.benefits}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            rows="2"
            placeholder="e.g. Health insurance, Flexible hours"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 font-semibold mb-2">Job Tags</label>
          <input
            type="text"
            name="jobTags"
            value={jobData.jobTags}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Remote, Full-time"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 font-semibold mb-2">Company Culture</label>
          <textarea
            name="companyCulture"
            value={jobData.companyCulture}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            rows="2"
            placeholder="Describe your company culture"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;
