// Dashboard.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';

const Dashboard = () => {
  
  return (
    <div className="h-screen flex flex-col">
    
      
      <div className="flex flex-grow">
        <Sidebar />
          <div className="flex-grow bg-gray-100 p-4">
          <h1 className="text-2xl">Welcome to the Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
