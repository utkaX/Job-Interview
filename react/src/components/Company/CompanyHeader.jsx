import React from "react";
import { FaMapMarkerAlt, FaEnvelope, FaGlobe } from "react-icons/fa";

const CompanyHeader = React.memo(({ company }) => {
  console.log("in the header", company);

  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-sm rounded-lg">
      <div className="flex items-center space-x-4">
        <img
          src={company?.logo}
          alt={`${company?.companyName || "Company"} Logo`}
          className="h-16 w-16 rounded-full"
        />
        <div className="m-8">
          <h1 className="text-2xl font-bold">
            {company?.companyName || "Unknown Company"}
          </h1>
         
          <p className="text-sm text-gray-500 flex items-center">
            <FaMapMarkerAlt className="mr-1 text-red-500" />{" "}
          
            {company?.location || "Location not available"}
          </p>
          <div className="flex space-x-2 mt-2">
            {company?.industry ? (
              <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                {company.industry}
              </span>
            ) : (
              <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                Industry not specified
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end space-y-2">
        <a
          href={company?.companyWebsite || "#"}
          className="text-xl text-blue-500 underline flex items-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGlobe className="mr-1 text-blue-500" />
        </a>
      </div>
    </div>
  );
});

export default CompanyHeader;
