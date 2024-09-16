import React, { useState } from "react";

const ExperienceEntry = ({ experience = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    companyName: experience.companyName || "",
    jobTitle: experience.jobTitle || "",
    startDate: experience.startDate || "",
    endDate: experience.endDate || "",
    description: experience.description || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      companyName: "",
      jobTitle: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  return (
    <div className="mb-4">
  <div className="mb-4">
    <label className="block">Company Name</label>
    <input
      type="text"
      name="companyName"
      value={formData.companyName}
      onChange={handleChange}
      className="border p-2 w-full"
    />
  </div>
  <div className="mb-4">
    <label className="block">Job Title</label>
    <input
      type="text"
      name="jobTitle"
      value={formData.jobTitle}
      onChange={handleChange}
      className="border p-2 w-full"
    />
  </div>
  <div className="mb-4 flex space-x-4">
    <div className="flex-1">
      <label className="block">Start Date</label>
      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        className="border p-2 w-full"
      />
    </div>
    <div className="flex-1">
      <label className="block">End Date</label>
      <input
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        className="border p-2 w-full"
      />
    </div>
  </div>
  <div className="mb-4">
    <label className="block">Job Description</label>
    <textarea
      name="description"
      value={formData.description}
      onChange={handleChange}
      className="border p-2 w-full"
    />
  </div>
  <button
    type="button"
    className="bg-green-500 text-white p-2 rounded mr-2"
    onClick={handleSubmit}
  >
    Save Experience
  </button>
  <button
    type="button"
    className="bg-gray-500 text-white p-2 rounded"
    onClick={onCancel}
  >
    Cancel
  </button>
</div>

  );
};

export default ExperienceEntry;
