import JobCard from "./JobCard";

const RecentJobs = ({ jobs }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-center my-8 text-blue-800">
        Recent Jobs
      </h2>
      <div className="job-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No jobs found.
          </p>
        ) : (
          jobs.map((job) => <JobCard key={job.id} jobDetails={job} />)
        )}
      </div>
    </div>
  );
};

export default RecentJobs;
