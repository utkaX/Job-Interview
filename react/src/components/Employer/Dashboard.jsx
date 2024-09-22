// Dashboard.jsx
import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer'

const Dashboard = () => {
  
  return (
    <div className="h-screen flex flex-col">
      {/* Full-width Navbar */}
      <Navbar />
      
      <div className="flex flex-grow">
        {/* Sidebar always visible, taking part of the left side */}
        <Sidebar />
        
        {/* Main content area takes the remaining space */}
        <div className="flex-grow bg-gray-100 p-4">
          <h1 className="text-2xl">Welcome to the Dashboard</h1>
          {/* Add other components or content here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
