import React, { useEffect, useState } from "react";
import Layout from "./Layout"; // Layout contains Navbar, Sidebar, and Footer
import { useAuth } from "../../context/authContext"; // Import the auth context
import { Pie } from "react-chartjs-2"; // Import the Pie chart component
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // Import required components from Chart.js

// Register the necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { user } = useAuth(); // Get the user from the auth context

  const [totalJobs, setTotalJobs] = useState(0); // State for total jobs
  const [liveJobs, setLiveJobs] = useState(0); // State for live jobs count
  const [notLiveJobs, setNotLiveJobs] = useState(0); // State for not live jobs count
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [noJobs, setNoJobs] = useState(false); // State to track no jobs

  useEffect(() => {
    const fetchTotalJobs = async () => {
      if (!user?._id) return; // Make sure user is available

      try {
        const companyResponse = await fetch(
          `http://localhost:8080/employer/getEmployerByUserId/${user._id}`
        );

        if (!companyResponse.ok) {
          console.log("Company API response status:", companyResponse.status);
          const errorText = await companyResponse.text(); // Get more details about the error
          throw new Error(`Failed to fetch company information: ${errorText}`);
        }

        const companyData = await companyResponse.json();

        const jobsResponse = await fetch(
          `http://localhost:8080/jobs/getJobsByEmployerId/${companyData._id}`
        );

        if (!jobsResponse.ok) {
          if (jobsResponse.status === 404) {
            setNoJobs(true); // If no jobs are found, set noJobs to true
          } else {
            console.log("Jobs API response status:", jobsResponse.status);
            const errorText = await jobsResponse.text(); // Get more details about the error
            throw new Error(`${errorText}`);
          }
        } else {
          const jobs = await jobsResponse.json();
          setTotalJobs(jobs.length); // Set total jobs count

          // Count live and not live jobs
          const liveCount = jobs.filter((job) => job.isLive).length;
          const notLiveCount = jobs.length - liveCount;

          setLiveJobs(liveCount); // Set live jobs count
          setNotLiveJobs(notLiveCount); // Set not live jobs count
        }
      } catch (err) {
        console.error(err); // Log the error for debugging
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalJobs();
  }, [user?._id]);

  if (loading) {
    return (
      <Layout>
        <p className="text-center text-lg">Loading...</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <p className="text-red-500 text-center">{error}</p>
      </Layout>
    );
  }

  if (noJobs) {
    return (
      <Layout>
        <p className="text-center text-lg text-gray-500">No jobs you have</p>
      </Layout>
    );
  }

  // Data for the pie chart
  const data = {
    labels: ["Live Jobs", "Not Live Jobs"],
    datasets: [
      {
        data: [liveJobs, notLiveJobs],
        backgroundColor: ["#36A2EB", "#FF6384"], // Colors for the pie segments
      },
    ],
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg mb-2">
          Total Jobs: <span className="font-semibold">{totalJobs}</span>
        </p>

        {/* Enhanced Live and Not Live Jobs Count */}
        <div className="flex justify-between mb-4">
          <div className="bg-green-100 border border-green-400 rounded-lg p-4 shadow-md text-center w-full mx-1">
            <h3 className="text-xl font-bold text-green-600">Live Jobs</h3>
            <p className="text-2xl font-semibold text-green-800">{liveJobs}</p>
          </div>
          <div className="bg-red-100 border border-red-400 rounded-lg p-4 shadow-md text-center w-full mx-1">
            <h3 className="text-xl font-bold text-red-600">Not Live Jobs</h3>
            <p className="text-2xl font-semibold text-red-800">{notLiveJobs}</p>
          </div>
        </div>

        {/* Pie Chart Component */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Job Status Distribution</h2>
          <div className="flex justify-center">
            <div className="w-72 md:w-96 lg:w-1/2">
              <Pie
                data={data}
                options={{
                  animation: false, // Disable animations
                  plugins: {
                    legend: {
                      display: true,
                      position: "top",
                      labels: {
                        color: "#333",
                        boxHeight: 10,
                        padding: 20,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
