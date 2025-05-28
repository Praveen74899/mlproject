import React, { useEffect, useState } from 'react';

const Productlist = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/projects');
      const data = await response.json();
      if (response.ok) {
        setProjects(data.projects || []);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) return <p className="text-center">Loading projects...</p>;
  if (projects.length === 0) return <p className="text-center">No projects found.</p>;

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white border border-gray-300 rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Project Name</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Hours</th>
            <th className="py-2 px-4 border-b">Date Received</th>
            <th className="py-2 px-4 border-b">Date Delivered</th>
            <th className="py-2 px-4 border-b">Contact</th>
            <th className="py-2 px-4 border-b">Client</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((proj, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{proj.projectName}</td>
              <td className="py-2 px-4 border-b">{proj.projectType}</td>
              <td className="py-2 px-4 border-b">{proj.category}</td>
              <td className="py-2 px-4 border-b">{proj.hours}</td>
              <td className="py-2 px-4 border-b">{proj.dateReceived}</td>
              <td className="py-2 px-4 border-b">{proj.dateDelivered}</td>
              <td className="py-2 px-4 border-b">{proj.contactPerson}</td>
              <td className="py-2 px-4 border-b">{proj.endClient}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Productlist;
