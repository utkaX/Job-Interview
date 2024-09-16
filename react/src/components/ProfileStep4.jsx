import { useState } from "react";
import { IoIosRemoveCircle } from "react-icons/io";

// eslint-disable-next-line react/prop-types
const ProfileStep4 = ({ formData, setFormData, prevStep, handleSubmit }) => {
  // eslint-disable-next-line react/prop-types
  const [jobPreferences, setJobPreferences] = useState(formData.jobTypePreferences || []);
  
  const jobTypes = ["Developer", "Designer", "Manager", "Tester", "Analyst"]; // Example job types

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
    const updatedPreferences = jobPreferences.filter(preference => preference !== jobType);
    setJobPreferences(updatedPreferences);
    setFormData((prev) => ({
      ...prev,
      jobTypePreferences: updatedPreferences,
    }));
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Select Your Job Preferences</h3>
      
      <div className="mb-4">
        {jobTypes.map((jobType, index) => (
          <button 
            key={index} 
            className={`px-4 py-2 m-2 border ${jobPreferences.includes(jobType) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => addJobPreference(jobType)}
          >
            {jobType}
          </button>
        ))}
      </div>

      <h4 className="text-lg font-semibold mb-2">Selected Preferences:</h4>
      <ul className="list-disc ml-5">
        {jobPreferences.length > 0 ? (
          jobPreferences.map((job, index) => (
            <li key={index} className="flex items-center mb-2">
              <span className="mr-2">{job}</span>
              <button 
                className="ml-2 text-red-500 rounded-full bg-gray-200 p-1 hover:bg-red-500 hover:text-white"
                onClick={() => removeJobPreference(job)}
              >
                <IoIosRemoveCircle className="h-5 w-5" /> {/* Heroicon remove icon */}
              </button>
            </li>
          ))
        ) : (
          <p>No preferences selected</p>
        )}
      </ul>

      <div className="mt-4 flex justify-between">
        <button onClick={prevStep} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">Previous</button>
        <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Submit</button>
      </div>
    </div>
  );
};

export default ProfileStep4;
