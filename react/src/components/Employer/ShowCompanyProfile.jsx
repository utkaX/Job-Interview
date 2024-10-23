import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext"; // Adjust the path as needed
import Layout from "./Layout";


const ShowCompanyProfile = () => {
  const [employer, setEmployer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedEmployer, setUpdatedEmployer] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    const fetchEmployerDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/employer/getEmployerByUserId/${user._id}`);
        const data = await response.json();
        setEmployer(data);
        setUpdatedEmployer(data);
      } catch (error) {
        console.error("Error fetching employer data:", error);
      }
    };

    fetchEmployerDetails();
  }, [user._id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployer({
      ...updatedEmployer,
      [name]: value,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/employer/updateEmployeeProfile/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEmployer),
      });
      const updatedData = await response.json();
      setEmployer(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating employer:", error);
    }
  };

  if (!employer) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Employer Profile</h1>

        {isEditing ? (
          <form onSubmit={handleUpdateSubmit} className="space-y-4">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Company Details</h2>

              <div>
                <label className="block mb-2">Company Name:</label>
                <input
                  type="text"
                  name="companyName"
                  value={updatedEmployer.companyName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block mb-2">Description:</label>
                <textarea
                  name="companyDescription"
                  value={updatedEmployer.companyDescription}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block mb-2">Website:</label>
                <input
                  type="text"
                  name="companyWebsite"
                  value={updatedEmployer.companyWebsite}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block mb-2">Location:</label>
                <input
                  type="text"
                  name="location"
                  value={updatedEmployer.location}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block mb-2">Industry:</label>
                <input
                  type="text"
                  name="industry"
                  value={updatedEmployer.industry}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block mb-2">Contact Email:</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={updatedEmployer.contactEmail}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block mb-2">Contact Phone:</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={updatedEmployer.contactPhone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="flex space-x-4 mt-4">
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        ) : (
          <>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Company Details</h2>
              <p><strong>Company Name:</strong> {employer.companyName}</p>
              <p><strong>Description:</strong> {employer.companyDescription}</p>
              <p><strong>Website:</strong> {employer.companyWebsite}</p>
              <p><strong>Location:</strong> {employer.location}</p>
              <p><strong>Industry:</strong> {employer.industry}</p>
              <p><strong>Contact Email:</strong> {employer.contactEmail}</p>
              <p><strong>Contact Phone:</strong> {employer.contactPhone}</p>

              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Edit
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default ShowCompanyProfile;
