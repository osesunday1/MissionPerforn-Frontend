import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col justify-center items-center ">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to TaskFlow 💼
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Organize your day, manage your tasks, and boost your productivity with our powerful task manager.
        </p>
        <p className="text-lg text-red mb-6">
         SignUp to Add Task
        </p>
        <Link
          to="/view-task"
          className="inline-block bg-secondary text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-secondary-100 transition"
        >
          View Tasks
        </Link>
      </div>
    </div>
  );
};

export default Home;