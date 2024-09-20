import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const JobDetails = () => {
    const jobId=useParams();
    // console.log(jobId.JobId)
    const[jobDetails,setJobDetails]=useState({})
    let details;

    const fetchJobDetails=async ()=>
    {
        // http://localhost:8080/jobs/getJobById/66c0e1bf27339975cbd8018f
        const URL="http://localhost:8080/jobs/getJobById/"+jobId.JobId
        const job=await fetch(URL)
        details=await job.json()
        setJobDetails(details)
    }

    useEffect(()=>{
        fetchJobDetails()
    },[])


    if (!jobDetails) return <div className="text-center text-gray-600">Loading...</div>;

    const formattedSalary = jobDetails.salary ? jobDetails.salary.toLocaleString() : 'N/A';
    const formattedDate = jobDetails.postedDate ? new Date(jobDetails.postedDate).toLocaleDateString() : 'N/A';
    const requirements = jobDetails.requirements ? jobDetails.requirements.join(', ') : 'N/A';
    const responsibilities = jobDetails.responsibilities ? jobDetails.responsibilities.join(', ') : 'N/A';
    const benefits = jobDetails.benefits ? jobDetails.benefits.join(', ') : 'N/A';
    const jobTags = jobDetails.jobTags ? jobDetails.jobTags.join(', ') : 'N/A';


  return (
    <div className="max-w-3xl mx-auto p-8 my-16 bg-white rounded-lg shadow-lg border border-gray-200">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">{jobDetails.title}</h1>
    <p className="text-lg mb-4"><strong className="text-blue-700" >Description:</strong> {jobDetails.description}</p>
    <p className="text-lg mb-4"><strong className="text-blue-700">Location:</strong> {jobDetails.location}</p>
    <p className="text-lg mb-4"><strong className="text-blue-700">Job Type:</strong> {jobDetails.jobType}</p>
    <p className="text-lg mb-4"><strong className="text-blue-700">Category:</strong> {jobDetails.category}</p>
    <p className="text-lg mb-4"><strong className="text-blue-700">Salary:</strong> ${formattedSalary}</p>
    <p className="text-lg mb-4"><strong className="text-blue-700">Posted Date:</strong> {formattedDate}</p>
    <p className="text-lg mb-4"><strong className="text-blue-700">Requirements:</strong> {requirements}</p>
    <p className="text-lg mb-4"><strong className="text-blue-700">Responsibilities:</strong> {responsibilities}</p>
    <p className="text-lg mb-4"><strong className="text-blue-700">Benefits:</strong> {benefits}</p>
    <p className="text-lg mb-4"><strong className="text-blue-700">Job Tags:</strong> {jobTags}</p>
    <p className="text-lg mb-4"><strong className="text-blue-700">Company Culture:</strong> {jobDetails.companyCulture || 'N/A'}</p>
    <div className="text-center mt-8">
    <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-6 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                        Apply Now
                    </button>
    </div>
</div>
  )
}

export default JobDetails