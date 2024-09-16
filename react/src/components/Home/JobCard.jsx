/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

const JobCard = (props) => {
    const{title,category,description,isLive,location,companyCulture,salary}=props.jobDetails
    
  return (
    <div className="mt-8 mx-12 bg-gradient-to-r from-blue-50 to-white shadow-xl rounded-lg p-6 mb-6 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
    <h2 className="text-3xl font-bold text-blue-800 mb-4 border-b pb-2">{title}</h2>
    
    <div className="mb-4">
        <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold">Category: </span>{category}
        </p>
        <p className="text-gray-700">
            <span className="font-semibold">Description: </span>{description}
        </p>
    </div>
    
    <div className="mb-4 flex items-center">
        <svg className="w-5 h-5 text-blue-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.687 2 6 4.687 6 8c0 4.227 6 12 6 12s6-7.773 6-12c0-3.313-2.687-6-6-6zm0 8.5c-1.381 0-2.5-1.119-2.5-2.5S10.619 5.5 12 5.5s2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"/></svg>
        <p className="text-gray-700">
            <span className="font-semibold">Location: </span>{location}
        </p>
    </div>
    
    <p className="text-gray-700 mb-4">
        <span className="font-semibold">Company Culture: </span>{companyCulture}
    </p>
    
    <p className="text-gray-700 mb-4">
        <span className="font-semibold">Salary: </span>${salary} per month
    </p>
    
    <p className={`inline-block px-4 py-2 rounded-full text-white font-semibold ${isLive ? 'bg-green-500' : 'bg-red-500'}`}>
        Status: {isLive ? "Live" : "Not Live"}
    </p>
</div>
  
  )
    
  
}

export default JobCard