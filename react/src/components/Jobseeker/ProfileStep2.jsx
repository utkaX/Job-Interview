import React, { useState } from "react";
import EducationEntry from "./EducationEntry"; // Ensure this path is correct

const ProfileStep2 = ({ formData, setFormData, nextStep, prevStep }) => {
  const [showNewEducation, setShowNewEducation] = useState(false);
  const [educationEntries, setEducationEntries] = useState(
    formData.education || []
  );

  // Add new education entry to the list
  const handleAddEducation = (newEducation) => {
    const updatedEducationEntries = [...educationEntries, newEducation];
    setEducationEntries(updatedEducationEntries);
    setFormData({ ...formData, education: updatedEducationEntries });
    setShowNewEducation(false); // Hide the new education form
  };

  // Remove education entry by index
  const handleRemoveEducation = (index) => {
    const updatedEducationEntries = educationEntries.filter(
      (_, i) => i !== index
    );
    setEducationEntries(updatedEducationEntries);
    setFormData({ ...formData, education: updatedEducationEntries });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 mt-8">
      {/* Added mt-8 for top margin */}
      <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
        Step 2: Education Details
      </h2>
      <div className="space-y-4">
        {/* Display each education entry */}
        {educationEntries.map((education, index) => (
          <div
            key={index}
            className="relative bg-white p-4 rounded-lg shadow-md"
          >
            <EducationEntry education={education} />
            <button
              type="button"
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600"
              onClick={() => handleRemoveEducation(index)}
            >
              <span className="sr-only">Remove</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
      {/* Button to add new education */}
      <button
        type="button"
        className="bg-teal-600 text-white font-bold py-2 px-6 rounded-lg mt-6 hover:bg-teal-700 transition"
        onClick={() => setShowNewEducation(true)}
      >
        Add New Education
      </button>
      {/* Conditional rendering of the new education form */}
      {showNewEducation && (
        <div className="mt-6">
          <EducationEntry
            onSubmit={handleAddEducation}
            onCancel={() => setShowNewEducation(false)}
          />
        </div>
      )}
      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          className="bg-gray-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-700 transition"
          onClick={prevStep}
        >
          Back
        </button>
        <button
          type="button"
          className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition"
          onClick={nextStep}
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default ProfileStep2;
