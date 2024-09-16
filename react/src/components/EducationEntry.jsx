import React, { useState } from "react";

const EducationEntry = ({ education = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    schoolName: education.schoolName || "",
    degree: education.degree || "",
    fieldOfStudy: education.fieldOfStudy || "",
    startDate: education.startDate || "",
    endDate: education.endDate || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      schoolName: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <div className="border p-4 mb-4">
      <h3 className="text-xl font-semibold mb-2">Education Entry</h3>
      <div className="mb-4">
        <label className="block">School Name</label>
        <input
          type="text"
          name="schoolName"
          value={formData.schoolName}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block">Degree</label>
        <input
          type="text"
          name="degree"
          value={formData.degree}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block">Field of Study</label>
        <input
          type="text"
          name="fieldOfStudy"
          value={formData.fieldOfStudy}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block">End Date</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <button
        type="button"
        className="bg-green-500 text-white p-2 rounded mr-2"
        onClick={handleSubmit}
      >
        Save Education
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

export default EducationEntry;
