import React from 'react';
import { useAuth } from '../../context/authContext';

const CompanyProfileReminder = () => {
  const { companyProfile } = useAuth();

  // Logic to show reminder or alert if no company profile exists
  if (!companyProfile) {
    return <div>You haven't filled out your company profile yet.</div>; // You can customize this to be a modal or notification
  }
  
  return null; // No reminder needed
};

export default CompanyProfileReminder;
