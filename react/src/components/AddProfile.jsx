import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import ProfileStep1 from "./ProfileStep1";
import ProfileStep2 from "./ProfileStep2";
import ProfileStep3 from "./ProfileStep3";
import ProfileStep4 from "./ProfileStep4"; 

const AddProfile = () => {
  const location = useLocation();
  const { name } = location.state || {};


  // Splitting full name into firstName and lastName
  const splitName = (fullName) => {
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.length > 1 ? nameParts.slice(-1)[0] : "";
    return { firstName, lastName };
  };

  // Initial state with split name
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    resume: "",
    skills: [],
    education: [],
    experience: [],
    location: "",
    savedJobs: [],
    appliedJobs: [],
    profilePicture: "",
    availability: "",
    preferredJobLocations: [],
    jobTypePreferences: [],
  });

  // Set the first and last name when the component mounts
  useEffect(() => {
    if (name) {
      const { firstName, lastName } = splitName(name);
      setFormData((prev) => ({
        ...prev,
        firstName,
        lastName,
      }));
    }
  }, [name]);

  const [step, setStep] = useState(1);
  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to submit profile");
      }
      alert("Profile submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to submit profile");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {step === 1 && (
        <ProfileStep1
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <ProfileStep2
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <ProfileStep3
          formData={formData}
          setFormData={setFormData}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      )}
      {step === 4 && (
        <ProfileStep4
          formData={formData}
          setFormData={setFormData}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default AddProfile;
