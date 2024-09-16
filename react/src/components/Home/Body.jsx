/* eslint-disable react/jsx-no-undef */
import { useEffect, useState } from "react"
import JobCard from "./JobCard"

const Body = () => {

  const [jobs,setJobs]=useState([])

  

  useEffect(()=>{
    fetchJobs()
  },[])

  const fetchJobs= async ()=>
    {
      const jobList=await fetch("http://localhost:8080/jobs/getAllJob")
      const json= await jobList.json()
      // console.log(json)
      setJobs(json)
    }

  return (
    <>
    {jobs.map((job) => (
      <JobCard key={job.id} jobDetails={job} />
    ))}
  </>
  
  )
}

export default Body