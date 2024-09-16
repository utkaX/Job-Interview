/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

const JobCard = (props) => {
    const{title,category,description,isLive,location,companyCulture}=props.jobDetails
    
  return (
  <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
  <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
  <p className="text-sm text-gray-500 mb-2"><strong>Category:</strong> {category}</p>
  <p className="text-gray-700 mb-4"><strong>Description:</strong> {description}</p>
  <p className="text-gray-700 mb-2"><strong>Location:</strong> {location}</p>
  <p className="text-gray-700 mb-4"><strong>Company Culture:</strong> {companyCulture}</p>
  <p className={`text-sm font-semibold ${isLive ? 'text-green-500' : 'text-red-500'}`}>
      Status: {isLive ? "Live" : "Not Live"}
  </p>
</div>
  )
    
  
}

export default JobCard