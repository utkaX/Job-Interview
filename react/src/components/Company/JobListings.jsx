import React from 'react';

export default function JobListings() {
  const dummyJobs = [
    { title: 'Frontend Developer', location: 'Remote' },
    { title: 'Backend Developer', location: 'San Francisco, USA' },
    { title: 'Full Stack Developer', location: 'New York, USA' }
  ];

  return (
    <div className="job-listings p-4 mt-4">
      <h2 className="text-xl font-bold">Open Positions</h2>
      {dummyJobs.map((job, index) => (
        <div key={index} className="border-b p-2">
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p>{job.location}</p>
        </div>
      ))}
    </div>
  );
}
