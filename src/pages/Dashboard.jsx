
// pages/Dashboard.jsx
import React, { useState } from 'react';
import Navbar from '../component/Navbar';
import Sidebar from '../component/Sidebar';
import { useAppContext } from '../context/AppContext';
import Productlist from '../component/Productlist';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('New');
  const [searchTerm, setSearchTerm] = useState('');
  const { handlernavigate } = useAppContext();


  

  return (
    <div className="min-h-screen bg-gray-100 pt-28">
      <Navbar activeTab={activeTab} userName="Praveen Patel" />
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="ml-64 flex-1 h-[calc(100vh-5rem)] overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <input
              type="text"
              placeholder="Search by name, client or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/2 p-3 border border-gray-300 rounded"
            />
            <button
              type="button"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
              onClick={handlernavigate}
            >
              Create Project
            </button>
          </div>
          <div>
            <Productlist />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;