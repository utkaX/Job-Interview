import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";

const UpdateProfile = () => {
  const [profile, setProfile] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/jobSeeker/getJobSeekerByUserId/${user._id}`
        );
        if (!response.ok) throw new Error("Failed to fetch job seeker");
        const data = await response.json();
        console.log(data);  
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10"> this is the profile page </div>
  );
};

export default UpdateProfile;
