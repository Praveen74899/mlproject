import React from 'react'

const Sidebar = ({activeTab,setActiveTab}) => {
 const tabs = ["New", "Sent to CEO", "Approved by Client", "Invoice Raised"];
  return (
    <div className="fixed top-20 left-0 w-64 h-[calc(100vh-5rem)] bg-gray-800 text-white p-4 overflow-y-auto">

      <h2 className="text-xl font-bold mb-4">Project Status</h2>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`w-full text-left py-2 px-3 rounded hover:bg-gray-700 ${
            activeTab === tab ? "bg-gray-700" : ""
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default Sidebar