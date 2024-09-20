import React from 'react'
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext"; 

export default function CompanyProfile() {

    const location = useLocation();
    const { name } = location.state || {};
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        companyName: name || "kaan",
        companyDescription: "",
        companyWebsite: "",
        location: "",
        industry: "",
        contactEmail: "",
        contactPhone: "",
        logo: null,
        linkedin: "",
        twitter: "",
        facebook: "",
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
      };
  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="font-medium">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Company Website</label>
          <input
            type="text"
            name="companyWebsite"
            value={formData.companyWebsite}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Industry</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>
      </div>

      <div className="grid grid-cols-1">
        <div className="flex flex-col">
          <label className="font-medium">Company Description</label>
          <textarea
            name="companyDescription"
            value={formData.companyDescription}
            onChange={handleChange}
            className="border p-2 rounded h-24"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="font-medium">Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Contact Phone</label>
          <input
            type="tel"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Logo URL</label>
          <input
            type="text"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label className="font-medium">LinkedIn</label>
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Twitter</label>
          <input
            type="text"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Facebook</label>
          <input
            type="text"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Submit
      </button>
    </form>
  )
}
