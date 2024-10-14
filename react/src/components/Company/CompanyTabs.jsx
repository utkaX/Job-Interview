import React from 'react';

export default function CompanyTabs({ selectedTab, setSelectedTab }) {
  return (
    <div className="mt-4 flex border-b">
      <button
        onClick={() => setSelectedTab('overview')}
        className={`p-4 ${selectedTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
      >
        Overview
      </button>
      <button
        onClick={() => setSelectedTab('jobs')}
        className={`p-4 ${selectedTab === 'jobs' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
      >
        Jobs
      </button>
    </div>
  );
}
