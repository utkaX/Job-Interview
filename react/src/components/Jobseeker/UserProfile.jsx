import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import UserProfileDisplay from "./UserProfileDisplay";
import ChangePassword from "./ChangePassword";
import UpdatePersonalInfo from "./UpdatePersonalInfo";
import UpdateExperience from "./UpdateExperience";
import UpdateEducation from "./UpdateEducation";
import config from "../../utils/config";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State for managing updates
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");

  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);

  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${config.baseUrl}/jobSeeker/getJobSeekerByUserId/${user._id}`
        );
        const data = await response.json();

        if (response.ok && data.success !== false) {
          setProfile(data);
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setBio(data.bio);
          setSkills(data.skills.join(", "));
          setExperience(data.experience);
          setEducation(data.education);
        } else {
          setError(data.message || "Unexpected error while fetching profile");
        }
      } catch (err) {
        setError("Error fetching profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user._id]);

  const handleFinish = async () => {
    try {
      const jobSeekerData = {
        firstName,
        lastName,
        bio,
        skills: skills.split(",").map(skill => skill.trim()),
        experience,
        education,
        ...(newPassword && { password: newPassword }), // Only include password if it's updated
      };

      const response = await fetch(`${config.baseUrl}/jobSeeker/updateJobSeekerById/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobSeekerData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error updating job seeker');
      }

      const data = await response.json();
      console.log('Job seeker updated:', data);
      setIsUpdating(false);
      setCurrentStep(0);
    } catch (error) {
      console.error('Error updating job seeker:', error.message);
      setError(error.message);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {!isUpdating ? (
          <UserProfileDisplay profile={profile} setIsUpdating={setIsUpdating} />
        ) : (
          <>
            {currentStep === 0 && (
              <ChangePassword
                oldPassword={oldPassword}
                setOldPassword={setOldPassword}
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                setCurrentStep={setCurrentStep}
                setIsUpdating={setIsUpdating}
              />
            )}
            {currentStep === 1 && (
              <UpdatePersonalInfo
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                bio={bio}
                setBio={setBio}
                skills={skills}
                setSkills={setSkills}
                setCurrentStep={setCurrentStep}
              />
            )}
            {currentStep === 2 && (
              <UpdateExperience
                experience={experience}
                setExperience={setExperience}
                setCurrentStep={setCurrentStep}
              />
            )}
            {currentStep === 3 && (
              <UpdateEducation
                education={education}
                setEducation={setEducation}
                handleFinish={handleFinish}
                setIsUpdating={setIsUpdating}
              />
            )}
            <div className="flex justify-between mt-4">
              {currentStep > 0 && (
                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
                  onClick={() => setCurrentStep(currentStep - 1)} // Back button
                >
                  Back
                </button>
              )}
              
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
