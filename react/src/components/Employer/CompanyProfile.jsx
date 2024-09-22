import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export default function CompanyProfile() {
  const location = useLocation();
  const { name } = location.state || {};
  const { user } = useAuth(); // Assuming user has the ID

  const [formData, setFormData] = useState({
    userId:user._id,
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
        Navigate("/employee-dashboard")
        // Optionally reset the form or redirect
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

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700">Company Name</label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Company Description</label>
        <textarea
          name="companyDescription"
          value={formData.companyDescription}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Company Website</label>
        <input
          type="url"
          name="companyWebsite"
          value={formData.companyWebsite}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Industry</label>
        <input
          type="text"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Contact Email</label>
        <input
          type="email"
          name="contactEmail"
          value={formData.contactEmail}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Contact Phone</label>
        <input
          type="tel"
          name="contactPhone"
          value={formData.contactPhone}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Logo URL</label>
        <input
          type="text"
          name="logo"
          value={formData.logo}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <h3 className="font-bold mb-2">Social Media Links</h3>
      <div className="mb-4">
        <label className="block text-gray-700">LinkedIn</label>
        <input
          type="text"
          name="linkedin"
          value={formData.socialMediaLinks.linkedin}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Twitter</label>
        <input
          type="text"
          name="twitter"
          value={formData.socialMediaLinks.twitter}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Facebook</label>
        <input
          type="text"
          name="facebook"
          value={formData.socialMediaLinks.facebook}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
        Add Employer
      </button>
    </form>
  );
}
