import React from 'react';

export default function CompanyProfile() {
  const dummyCompany = {
    name: 'TechCorp',
    logo: 'https://via.placeholder.com/80',
    description: 'Leading technology solutions provider.',
    location: 'New York, USA',
    website: 'https://techcorp.com'
  };

  return (
    <div className="company-profile p-4">
      <img src={dummyCompany.logo} alt="Company Logo" className="h-20 w-20 rounded mb-2" />
      <h1 className="text-2xl font-bold">{dummyCompany.name}</h1>
      <p className="text-gray-700">{dummyCompany.description}</p>
      <p><strong>Location:</strong> {dummyCompany.location}</p>
      <a href={dummyCompany.website} target="_blank" rel="noopener noreferrer" className="text-blue-500">
        Visit Website
      </a>
    </div>
  );
}
