import React from 'react';
import { useAuth } from '../context/AuthContext';

const UserData = () => {
  const { userData, loading, userID, userToken } = useAuth();
  const token = localStorage.getItem('token');

  if (loading) return <p className="text-center mt-10">Loading user info...</p>;
  if (!userID) return <p className="text-center mt-10">No user data found.</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">👤 User Profile</h2>
      <p><strong>Name:</strong> {userData.data.name}</p>
      <p><strong>Email:</strong> {userData.data.email}</p>
    </div>
  );
};

export default UserData;