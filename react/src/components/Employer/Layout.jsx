import React from "react";
import Navbar from "./Navbar"; // Import your Navbar component
import Sidebar from "./Sidebar"; // Import the Sidebar component
import Footer from "./Footer"; // Assuming you have a Footer component

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      {" "}
      {/* Container for full-screen layout */}
      {/* Navbar at the top */}
      <Navbar />
      <div className="flex flex-1">
        {" "}
        {/* Flex container for Sidebar and Content */}
        {/* Sidebar */}
        <Sidebar />
        {/* Main content */}
        <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          {children} {/* This will render the page content */}
        </div>
      </div>
      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default Layout;
