import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Sidebar from "./Sidebar";

export default function CompanyProfile() {
  const location = useLocation();
  const { user } = useAuth(); // Assuming user has the ID

  // Initialize form state
  const [formData, setFormData] = useState({
    userId: user._id,
    companyName: "",
    companyDescription: "",
    companyWebsite: "",
    location: "",
    industry: "",
    contactEmail: "",
    contactPhone: "",
    logo: "",
    socialMediaLinks: {
      linkedin: "",
      twitter: "",
      facebook: "",
    },
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.socialMediaLinks) {
      setFormData((prevState) => ({
        ...prevState,
        socialMediaLinks: {
          ...prevState.socialMediaLinks,
          [name]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle logo upload
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Replace this with your upload logic to cloud storage
      const uploadedLogoUrl = await uploadLogoToServer(file);
      setFormData((prevState) => ({
        ...prevState,
        logo: uploadedLogoUrl,
      }));
    }
  };

  // Placeholder function for uploading logo to server
  const uploadLogoToServer = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await fetch("http://localhost:8080/logo/upload-logo", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.url; // The URL of the uploaded logo
      } else {
        throw new Error("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading logo:", error);
      alert("Failed to upload logo. Please try again.");
      return "";
    }
  };
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/employee/addEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Employer added:", data);
        alert("Employer profile added successfully!");

        // Store flag in localStorage to prevent future prompts
        localStorage.setItem("profileCompleted", "true");

        Navigate("/employee-dashboard");
      } else {
        const errorData = await response.json();
        console.error("Error adding employer:", errorData);
        alert("Error adding employer profile");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  // Effect to handle the prompt every 10 minutes
  useEffect(() => {
    const profileCompleted = localStorage.getItem("profileCompleted");

    if (!profileCompleted) {
      const promptInterval = setInterval(() => {
        alert("Please complete your company profile!");
      }, 600000); // 10 minutes = 600,000 ms

      return () => clearInterval(promptInterval);
    }
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-100">
        <h2 className="text-2xl font-semibold mb-6 text-center">Company Profile</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
          
          {/* General Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-medium">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Industry</label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Company Website</label>
              <input
                type="url"
                name="companyWebsite"
                value={formData.companyWebsite}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium">Company Description</label>
            <textarea
              name="companyDescription"
              value={formData.companyDescription}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-medium">Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Contact Phone</label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mb-6">
            <h3 className="font-bold mb-2">Social Media Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["linkedin", "twitter", "facebook"].map((platform) => (
                <div key={platform}>
                  <label className="block text-gray-700 font-medium">
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </label>
                  <input
                    type="text"
                    name={platform}
                    value={formData.socialMediaLinks[platform]}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Logo Upload */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium">Upload Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-3 rounded w-full hover:bg-blue-600 transition"
          >
            Save Company Profile
          </button>
        </form>
      </div>
    </div>
  );
}
