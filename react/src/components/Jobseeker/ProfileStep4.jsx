import { useState } from "react";
import { IoIosRemoveCircle } from "react-icons/io";

// eslint-disable-next-line react/prop-types
const ProfileStep4 = ({ formData, setFormData, prevStep, handleSubmit }) => {
  // eslint-disable-next-line react/prop-types
  const [jobPreferences, setJobPreferences] = useState(
    formData.jobTypePreferences || []
  );

  const jobTypes = [
    "Software Engineer",
    "Web Developer",
    "UI/UX Designer",
    "Project Manager",
    "Quality Assurance Tester",
    "Data Analyst",
    "Product Manager",
    "Business Analyst",
    "Full Stack Developer",
    "Backend Developer",
    "Frontend Developer",
    "DevOps Engineer",
    "Network Engineer",
    "Cybersecurity Specialist",
    "Mobile App Developer",
    "Cloud Architect",
    "Database Administrator",
    "IT Support Specialist",
    "System Administrator",
    "Machine Learning Engineer",
    "Data Scientist",
    "AI Engineer",
    "Blockchain Developer",
    "Game Developer",
    "SEO Specialist",
    "Content Writer",
    "Digital Marketing Specialist",
    "Social Media Manager",
    "Graphic Designer",
    "Video Editor",
    "IT Consultant",
    "Helpdesk Technician",
    "Network Administrator",
    "Information Security Analyst",
    "Software Architect",
    "Solutions Architect",
    "Technical Lead",
    "Scrum Master",
    "Agile Coach",
    "Sales Engineer",
    "Customer Success Manager",
    "Tech Support Engineer",
    "Business Intelligence Developer",
    "ERP Consultant",
    "Cloud Consultant",
    "Mobile UI Designer",
    "IT Operations Manager",
    "Data Engineer",
    "Firmware Engineer",
    "Hardware Engineer",
    "Penetration Tester",
  ];

  const addJobPreference = (jobType) => {
    if (!jobPreferences.includes(jobType)) {
      const updatedPreferences = [...jobPreferences, jobType];
      setJobPreferences(updatedPreferences);
      setFormData((prev) => ({
        ...prev,
        jobTypePreferences: updatedPreferences,
      }));
    }
  };

  const removeJobPreference = (jobType) => {
    const updatedPreferences = jobPreferences.filter(
      (preference) => preference !== jobType
    );
    setJobPreferences(updatedPreferences);
    setFormData((prev) => ({
      ...prev,
      jobTypePreferences: updatedPreferences,
    }));
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Select Your Job Preferences</h3>
      <h4 className="text-lg font-semibold mb-2">Selected Preferences:</h4>
      <div className="flex flex-wrap gap-2">
        {jobPreferences.length > 0 ? (
          jobPreferences.map((job, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-200 rounded-full p-2"
            >
              <span className="mr-2">{job}</span>
              <button
                className="text-red-500 rounded-full p-1 hover:bg-red-500 hover:text-white"
                onClick={() => removeJobPreference(job)}
              >
                <IoIosRemoveCircle className="h-5 w-5" />
              </button>
            </div>
          ))
        ) : (
          <p>No preferences selected</p>
        )}
      </div>

      <div className="mb-4 mt-6">
        {jobTypes.map((jobType, index) => (
          <button
            key={index}
            className={`px-4 py-2 m-2 border ${
              jobPreferences.includes(jobType)
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => addJobPreference(jobType)}
          >
            {jobType}
          </button>
        ))}
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={prevStep}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProfileStep4;
