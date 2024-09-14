import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProfile() {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    resume: "",
    skills: "",
    location: "",
    desiredJobType: "",
    desiredLocations: "",
  });
  const [experience, setExperience] = useState([
    {
      companyName: "",
      jobTitle: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);
  const [education, setEducation] = useState([
    {
      schoolName: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const newExperience = [...experience];
    newExperience[index][name] = value;
    setExperience(newExperience);
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const newEducation = [...education];
    newEducation[index][name] = value;
    setEducation(newEducation);
  };

  const handleAddExperience = () => {
    setExperience([
      ...experience,
      {
        companyName: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const handleAddEducation = () => {
    setEducation([
      ...education,
      {
        schoolName: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/jobseeker/add-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...profileData, experience, education }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save profile");
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          Add Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Details */}
          {Object.keys(profileData).map((key) => (
            <div key={key}>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor={key}
              >
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </label>
              <input
                type="text"
                id={key}
                name={key}
                className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={profileData[key]}
                onChange={handleInputChange}
                required
              />
            </div>
          ))}

          {/* Experience */}
          {experience.map((exp, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold">Experience {index + 1}</h3>
              {Object.keys(exp).map((key) => (
                <div key={key}>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor={`${key}-${index}`}
                  >
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </label>
                  <input
                    type="text"
                    id={`${key}-${index}`}
                    name={key}
                    className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={exp[key]}
                    onChange={(e) => handleExperienceChange(index, e)}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddExperience}
                className="text-blue-500"
              >
                Add More Experience
              </button>
            </div>
          ))}

          {/* Education */}
          {education.map((edu, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold">Education {index + 1}</h3>
              {Object.keys(edu).map((key) => (
                <div key={key}>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor={`${key}-${index}`}
                  >
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </label>
                  <input
                    type="text"
                    id={`${key}-${index}`}
                    name={key}
                    className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={edu[key]}
                    onChange={(e) => handleEducationChange(index, e)}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddEducation}
                className="text-blue-500"
              >
                Add More Education
              </button>
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProfile;
