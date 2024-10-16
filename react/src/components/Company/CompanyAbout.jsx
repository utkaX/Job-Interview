import React from "react";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa"; // Importing icons from react-icons

const CompanyAbout = React.memo(({ company }) => {
  // console.log("company", company?.companyName);

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">About {company?.companyName || "Unknown Company"}</h2>
      <p className="text-gray-600">
        {company?.companyDescription || "No description available."}
      </p>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Contact Information:</h3>
        <p className="text-gray-600">
          Email: {company?.contactEmail || "Email not provided"}
        </p>
        <p className="text-gray-600">
          Phone: {company?.contactPhone || "Phone number not provided"}
        </p>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Follow Us:</h3>
        <div className="flex space-x-4">
          {company?.socialMediaLinks?.linkedin && (
            <a
              href={company.socialMediaLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              <FaLinkedin size={24} />
            </a>
          )}
          {company?.socialMediaLinks?.twitter && (
            <a
              href={company.socialMediaLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              <FaTwitter size={24} />
            </a>
          )}
          {company?.socialMediaLinks?.facebook && (
            <a
              href={company.socialMediaLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              <FaFacebook size={24} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
});

export default CompanyAbout;
