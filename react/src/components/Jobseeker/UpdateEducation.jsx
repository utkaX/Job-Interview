import React from "react";

const UpdateEducation = ({ education, setEducation, handleFinish, setIsUpdating }) => {
  const handleAddEducation = () => {
    setEducation([...education, { schoolName: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "" }]);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-6 border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Update Education</h2>
      {education.map((edu, index) => (
        <div key={index} className="mb-4 border-b border-gray-300 pb-4">
          <input
            type="text"
            placeholder="School Name"
            value={edu.schoolName}
            onChange={(e) => {
              const newEducation = [...education];
              newEducation[index].schoolName = e.target.value;
              setEducation(newEducation);
            }}
            className="mt-4 mb-2 p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <input
            type="text"
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) => {
              const newEducation = [...education];
              newEducation[index].degree = e.target.value;
              setEducation(newEducation);
            }}
            className="mt-4 mb-2 p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <input
            type="text"
            placeholder="Field of Study"
            value={edu.fieldOfStudy}
            onChange={(e) => {
              const newEducation = [...education];
              newEducation[index].fieldOfStudy = e.target.value;
              setEducation(newEducation);
            }}
            className="mt-4 mb-2 p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <input
            type="date"
            placeholder="Start Date"
            value={edu.startDate}
            onChange={(e) => {
              const newEducation = [...education];
              newEducation[index].startDate = e.target.value;
              setEducation(newEducation);
            }}
            className="mt-4 mb-2 p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <input
            type="date"
            placeholder="End Date"
            value={edu.endDate}
            onChange={(e) => {
              const newEducation = [...education];
              newEducation[index].endDate = e.target.value;
              setEducation(newEducation);
            }}
            className="mt-4 mb-2 p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>
      ))}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-300 mt-4"
        onClick={handleAddEducation}
      >
        Add Education
      </button>
      <div className="flex justify-end mt-6">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-300"
          onClick={() => {
            handleFinish();
            setIsUpdating(false); // End updating process
          }}
        >
          Finish Updating Profile
        </button>
      </div>
    </div>
  );
};

export default UpdateEducation;
