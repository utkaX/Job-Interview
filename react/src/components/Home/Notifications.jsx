import React from 'react';
import { useAuth } from '../../context/authContext'; // Import the auth context
import AuthButtons from './AuthButtons'; // Import the AuthButtons component

const Notifications = () => {
  const { user } = useAuth(); // Get the user state from context

  return (
    <div className="">
      <h1 className="">Notifications</h1>
      {/* Check if user is logged in */}
      {user ? (
        <div>
          <p>You have no new notifications.</p>
          {/* You can add additional notification content here */}
        </div>
      ) : (
        <AuthButtons isLoggedIn={user !== null} /> // Show login/signup buttons if not logged in
      )}
    </div>
  );
};

export default Notifications;
