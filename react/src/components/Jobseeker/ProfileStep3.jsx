import React, { useState } from "react";
import ExperienceEntry from "./ExperienceEntry"; // Ensure this path is correct

const ProfileStep3 = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
  saveProgress,
}) => {
  const [showNewExperience, setShowNewExperience] = useState(false);
  const [experienceEntries, setExperienceEntries] = useState(
    formData.experience || []
  );

  // Add new experience entry to the list
  const handleAddExperience = (newExperience) => {
    const updatedExperienceEntries = [...experienceEntries, newExperience];
    setExperienceEntries(updatedExperienceEntries);
    setFormData({ ...formData, experience: updatedExperienceEntries });
    setShowNewExperience(false); // Hide the new experience form
  };

  // Update existing experience entry
  const handleUpdateExperience = (index, updatedExperience) => {
    const updatedExperienceEntries = experienceEntries.map((exp, i) =>
      i === index ? updatedExperience : exp
    );
    setExperienceEntries(updatedExperienceEntries);
    setFormData({ ...formData, experience: updatedExperienceEntries });
    setShowNewExperience(false); // Hide the form after updating
  };

  // Remove experience entry by index
  const handleRemoveExperience = (index) => {
    const updatedExperienceEntries = experienceEntries.filter(
      (_, i) => i !== index
    );
    setExperienceEntries(updatedExperienceEntries);
    setFormData({ ...formData, experience: updatedExperienceEntries });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 ">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
        Step 3: Experience Details
      </h2>

      <div className="space-y-4">
        {/* Display each experience entry */}
        {experienceEntries.map((experience, index) => (
          <div
            key={experience.id || index}
            className="relative bg-white p-4 rounded-lg shadow-md"
          >
            <ExperienceEntry
              experience={experience}
              onSubmit={(updatedExperience) =>
                handleUpdateExperience(index, updatedExperience)
              }
              onCancel={() => setShowNewExperience(false)}
            />
            <button
              type="button"
              className="absolute top- right-2 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition"
              onClick={() => handleRemoveExperience(index)}
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

      {/* Button to add new experience */}
      <button
        type="button"
        onClick={() => setShowNewExperience(true)}
        className="bg-teal-600 text-white py-2 px-4 rounded-lg mt-6 hover:bg-teal-700 transition"
      >
        Add New Experience
      </button>

      {/* Conditional rendering of the new experience form */}
      {showNewExperience && (
        <div className="mt-6">
          <ExperienceEntry
            onSubmit={handleAddExperience}
            onCancel={() => setShowNewExperience(false)}
          />
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProfileStep3;
