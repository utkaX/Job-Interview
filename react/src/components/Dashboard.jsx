import { useState, useEffect } from 'react'; // Import hooks from React
import Navbar from './Navbar'; // Assuming Navbar is a component you have created
import '../css/dashboard.css'; // Import CSS for styling the dashboard

export default function Dashboard() {
  const [data, setData] = useState([]); // State to store data, e.g., user info, stats, etc.
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Example effect: fetch data when the dashboard loads
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard-data'); // Adjust the API endpoint as needed
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        {loading ? (
          <p>Loading data...</p> // Loading state message
        ) : (
          <div className="dashboard-data">
            {/* Map through your data here or display relevant dashboard info */}
            {data.map((item, index) => (
              <div key={index} className="dashboard-item">
                {/* Render your dashboard data here */}
                <p>{item.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
