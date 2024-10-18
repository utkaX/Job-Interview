import React from "react";

const UpdatePersonalInfo = ({ firstName, setFirstName, lastName, setLastName, bio, setBio, skills, setSkills, setCurrentStep }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-6 border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Update Personal Info</h2>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="mt-4 mb-4 p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="mt-4 mb-4 p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
      <textarea
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="mt-4 mb-4 p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
      <input
        type="text"
        placeholder="Skills (comma-separated)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        className="mt-4 mb-4 p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
      <div className="flex justify-end mt-6">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-300"
          onClick={() => setCurrentStep(2)} // Next button to Update Experience
        >
          Next: Update Experience
        </button>
      </div>
    </div>
  );
};

export default UpdatePersonalInfo;
