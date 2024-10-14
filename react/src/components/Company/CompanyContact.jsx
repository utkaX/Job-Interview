import React from "react";

export default function CompanyContact() {
  const dummyContact = {
    email: "contact@techcorp.com",
    phone: "+1 (800) 123-4567",
  };

  return (
    <div className="company-contact p-4 mt-4">
      <h2 className="text-xl font-bold">Contact Information</h2>
      <p>
        <strong>Email:</strong> {dummyContact.email}
      </p>
      <p>
        <strong>Phone:</strong> {dummyContact.phone}
      </p>
    </div>
  );
}
