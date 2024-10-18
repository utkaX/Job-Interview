import React from "react";

const UserProfileDisplay = ({ profile, setIsUpdating }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-300">
      <h2 className="text-3xl font-semibold mb-4">User Profile</h2>
      <p><strong>First Name:</strong> {profile.firstName}</p>
      <p><strong>Last Name:</strong> {profile.lastName}</p>
      <p><strong>Bio:</strong> {profile.bio}</p>
      <p><strong>Skills:</strong> {profile.skills.join(", ")}</p>

      <h3 className="text-xl font-semibold mt-4">Experience</h3>
      {profile.experience.map((exp, index) => (
        <div key={index}>
          <p><strong>Company:</strong> {exp.companyName}</p>
          <p><strong>Job Title:</strong> {exp.jobTitle}</p>
          <p><strong>Start Date:</strong> {new Date(exp.startDate).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(exp.endDate).toLocaleDateString()}</p>
          <p><strong>Description:</strong> {exp.description}</p>
        </div>
      ))}

      <h3 className="text-xl font-semibold mt-4">Education</h3>
      {profile.education.map((edu, index) => (
        <div key={index}>
          <p><strong>Institution:</strong> {edu.schoolName}</p>
          <p><strong>Degree:</strong> {edu.degree}</p>
          <p><strong>Field of Study:</strong> {edu.fieldOfStudy}</p>
          <p><strong>Start Date:</strong> {new Date(edu.startDate).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(edu.endDate).toLocaleDateString()}</p>
        </div>
      ))}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 mt-4"
        onClick={() => setIsUpdating(true)}
      >
        Update Profile
      </button>
    </div>
  );
};

export default UserProfileDisplay;
