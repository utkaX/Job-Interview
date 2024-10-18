import React from "react";
import { useAuth } from "../../context/authContext";


const ChangePassword = ({
  oldPassword,
  setOldPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  setCurrentStep,
  setIsUpdating,
}) => {
    const { user } = useAuth();

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
   
    try {
      const response = await fetch(
        `http://localhost:8080/users/updatePasswordById/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update password");
      }

      alert("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setCurrentStep(1); // Move to the next step after successful password update
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Error updating password: " + error.message);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-6 border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Change Password</h2>
      <input
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        className="mt-4 mb-4 p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="mt-4 mb-4 p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="mt-4 mb-4 p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
      <div className="flex justify-between mt-6">
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded-lg transition duration-300"
          onClick={() => setIsUpdating(false)}
        >
          Back
        </button>
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-300"
            onClick={handlePasswordUpdate}
          >
            Update Password
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-300"
            onClick={() => setCurrentStep(2)} // Proceed to the next step
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
