import React, { useState, useEffect } from "react";
import CompanyHeader from "./CompanyHeader";
import CompanyTabs from "./CompanyTabs";
import CompanyAbout from "./CompanyAbout";
import JobListings from "./JobListings";
import { useNavigate, useLocation } from "react-router-dom";

export default function Company() {
  const [employees, setEmployees] = useState();
  const [selectedTab, setSelectedTab] = useState("overview");
  const location = useLocation();
  const companyId = location.state?.companyId
    ? decodeURIComponent(location.state.companyId)
    : null;
  console.log(companyId);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/employer/${companyId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (companyId) {
      fetchEmployees();
    }
  }, [companyId]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <CompanyHeader company={employees} />
      <CompanyTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {selectedTab === "overview" && (
        <div>
          <CompanyAbout company={employees} />
        </div>
      )}

      {selectedTab === "jobs" && (
        <JobListings companyId={employees} company={employees} />
      )}
    </div>
  );
}
