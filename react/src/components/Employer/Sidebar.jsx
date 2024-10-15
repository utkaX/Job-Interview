// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="bg-gray-800 text-white w-64 p-4 max-h-full">
            <h2 className="text-lg font-bold mb-4">Menu</h2>
            <ul className="space-y-2">
                <li>
                    <Link to="/postJob" className="block p-2 rounded hover:bg-gray-700 transition">
                        Post Job
                    </Link>
                </li>
                <li>
                    <Link to="/manage-jobs" className="block p-2 rounded hover:bg-gray-700 transition">
                        Manage Jobs
                    </Link>
                </li>
                <li>
                    <Link to="#" className="block p-2 rounded hover:bg-gray-700 transition">
                        View Applications
                    </Link>
                </li>
                <li>
                    <Link to="#" className="block p-2 rounded hover:bg-gray-700 transition">
                        Interview Schedule
                    </Link>
                </li>
                <li>
                    <Link to="#" className="block p-2 rounded hover:bg-gray-700 transition">
                        Analytics
                    </Link>
                </li>
                <li>
                    <Link to="/employee-profile" className="block p-2 rounded hover:bg-gray-700 transition">
                        Company Profile
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
