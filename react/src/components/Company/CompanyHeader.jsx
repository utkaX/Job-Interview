import React from 'react';

export default function CompanyHeader() {
  const company = {
    name: 'Koch Industries',
    logo: 'https://via.placeholder.com/80',
    followers: 219,
  };

  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-sm rounded-lg">
      <div className="flex items-center space-x-4">
        <img src={company.logo} alt="Company Logo" className="h-16 w-16 rounded-full" />
        <div>
          <h1 className="text-2xl font-bold">{company.name}</h1>
          <p className="text-sm text-gray-500">All In All Together</p>
          <div className="flex space-x-2">
            <span className="text-sm bg-gray-100 px-2 py-1 rounded">Oil & Gas</span>
            <span className="text-sm bg-gray-100 px-2 py-1 rounded">Private</span>
            <span className="text-sm bg-gray-100 px-2 py-1 rounded">Foreign MNC</span>
          </div>
        </div>
      </div>
      {/* <div className="flex items-center space-x-4">
        <p className="text-sm text-gray-600">{company.followers} followers</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">+ Follow</button>
      </div> */}
    </div>
  );
}
