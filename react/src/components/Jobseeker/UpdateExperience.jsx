import React from "react";

const UpdateExperience = ({ experience, setExperience, setCurrentStep }) => {
  const handleAddExperience = () => {
    setExperience([...experience, { companyName: "", jobTitle: "", startDate: "", endDate: "", description: "" }]);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-6 border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Update Experience</h2>
      {experience.map((exp, index) => (
        <div key={index} className="mb-4 border-b border-gray-300 pb-4">
          <input
            type="text"
            placeholder="Company Name"
            value={exp.companyName}
            onChange={(e) => {
              const newExperience = [...experience];
              newExperience[index].companyName = e.target.value;
              setExperience(newExperience);
            }}
            className="mt-4 mb-2 p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <input
            type="text"
            placeholder="Job Title"
            value={exp.jobTitle}
            onChange={(e) => {
              const newExperience = [...experience];
              newExperience[index].jobTitle = e.target.value;
              setExperience(newExperience);
            }}
            className="mt-4 mb-2 p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <input
            type="date"
            placeholder="Start Date"
            value={exp.startDate}
            onChange={(e) => {
              const newExperience = [...experience];
              newExperience[index].startDate = e.target.value;
              setExperience(newExperience);
            }}
            className="mt-4 mb-2 p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <input
            type="date"
            placeholder="End Date"
            value={exp.endDate}
            onChange={(e) => {
              const newExperience = [...experience];
              newExperience[index].endDate = e.target.value;
              setExperience(newExperience);
            }}
            className="mt-4 mb-2 p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <textarea
            placeholder="Description"
            value={exp.description}
            onChange={(e) => {
              const newExperience = [...experience];
              newExperience[index].description = e.target.value;
              setExperience(newExperience);
            }}
            className="mt-4 mb-2 p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>
      ))}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-300 mt-4"
        onClick={handleAddExperience}
      >
        Add Experience
      </button>
      <div className="flex justify-end mt-6">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-300"
          onClick={() => setCurrentStep(3)} // Next button to Update Education
        >
          Next: Update Education
        </button>
      </div>
    </div>
  );
};

export default UpdateExperience;
