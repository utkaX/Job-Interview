import JobCard from "./JobCard";

const RecentJobs = ({ jobs }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 px-4">Recent Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg mb-2">{job.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{job.company}</p>
                <p className="text-gray-500 text-sm mb-2">{job.location}</p>
                <p className="text-gray-500 text-sm">
                  Experience: {job.experience || "Not specified"}
                </p>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(job.postedDate).toLocaleDateString()}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {job.jobTags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentJobs;
