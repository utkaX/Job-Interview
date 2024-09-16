import React, { useState, useEffect } from "react";

const ProfileStep1 = ({ formData, setFormData, nextStep }) => {
  const [profilePreview, setProfilePreview] = useState(null);

  const getAvatarUrl = (firstName, lastName) => {
    const fullName = `${firstName || ""}+${lastName || ""}`;
    return `https://ui-avatars.com/api/?name=${fullName}&background=0D8ABC&color=fff`;
  };

  useEffect(() => {
    if (formData.firstName || formData.lastName) {
      const avatarUrl = getAvatarUrl(formData.firstName, formData.lastName);
      setProfilePreview(avatarUrl);
    }
  }, [formData.firstName, formData.lastName]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
        setFormData({ ...formData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-center mb-6">
        {profilePreview ? (
          <img
            src={profilePreview}
            alt="Profile Preview"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
            {formData.firstName
              ? formData.firstName.charAt(0).toUpperCase()
              : "P"}
          </div>
        )}
      </div>

      <div className="mb-6 text-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block mx-auto text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>

      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Personal Details
      </h2>
      <form>
        <div className="mb-6">
          <label className="block text-gray-600 mb-2">First Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your first name"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2">Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your last name"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2">Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Write a short bio"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2">Resume (URL)</label>
          <input
            type="text"
            value={formData.resume}
            onChange={(e) =>
              setFormData({ ...formData, resume: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter resume URL"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2">
            Skills (comma separated)
          </label>
          <input
            type="text"
            value={formData.skills.join(", ")}
            onChange={(e) =>
              setFormData({ ...formData, skills: e.target.value.split(", ") })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="E.g. JavaScript, React, Node.js"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={nextStep}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileStep1;
