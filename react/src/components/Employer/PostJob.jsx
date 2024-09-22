import React, { useState } from 'react';

const PostJob = () => {
  const [jobData, setJobData] = useState({
    employerId: "66efe3dcbac0e8b52fae6122",
    title: '',
    description: '',
    location: '',
    jobType: '',
    category: '',
    salary: '',
    requirements: [],
    responsibilities: [],
    isLive: false,
    benefits: [],
    jobTags: [],
    companyCulture: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/jobs/addJob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Job added successfully:', result);
      } else {
        console.error('Error adding job:', result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

 
  return (
    <div className="max-w-4xl mx-auto my-5 bg-white p-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">Post a New Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-2">Job Title</label>
              <input
                type="text"
                name="title"
                value={jobData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={jobData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-2">Job Type</label>
              <input
                type="text"
                name="jobType"
                value={jobData.jobType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-2">Salary</label>
              <input
                type="number"
                name="salary"
                value={jobData.salary}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-2">Category</label>
              <input
                type="text"
                name="category"
                value={jobData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-2">Description</label>
              <textarea
                name="description"
                value={jobData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                rows="4"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-2">Responsibilities (one per line)</label>
              <textarea
                name="responsibilities"
                value={jobData.responsibilities}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                rows="3"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-2">Requirements (one per line)</label>
              <textarea
                name="requirements"
                value={jobData.requirements}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* Full Width Section */}
        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">Benefits (one per line)</label>
          <textarea
            name="benefits"
            value={jobData.benefits}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            rows="2"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">Job Tags (comma-separated)</label>
          <input
            type="text"
            name="jobTags"
            value={jobData.jobTags}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">Company Culture</label>
          <textarea
            name="companyCulture"
            value={jobData.companyCulture}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            rows="2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;
