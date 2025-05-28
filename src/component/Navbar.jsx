import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Navbar = ({ activeTab, userName = "User" }) => {

    const { handlernavigate,navigate} = useAppContext();


  return (
<div className="flex items-center justify-between p-6 bg-gray-400 gap-6 fixed top-0 left-0 w-full z-50 h-20">


      <div>
        <h1 className="text-2xl font-bold mb-1">Welcome to Dashboard</h1>
        <p className="text-gray-700 text-md">
          Selected Tab: <strong>{activeTab}</strong>
        </p>
      </div>

      <div className='bg-gray-800 text-white rounded-lg p-3'>
        <button onClick={handlernavigate}> Create Project</button>
      </div>

      {/* User Profile & Logout */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <span className="font-semibold">{userName}</span>
          <small className="text-gray-700">Profile</small>
        </div>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          title="Logout"
       
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;