import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  deleteProject,
  updateProjectStatus,
  setProjectList,
} from '../../utils/PropertyManagementSlice'; // Adjust path if needed

const InactiveRequest = () => {
  const dispatch = useDispatch();

  const {
    projectList = [],
    loading,
    error,
  } = useSelector((state) => state.PropertyInfo || {});

  const fetchProjects = async () => {
    try {
      const res = await fetch('https://realstate-2.onrender.com/api/v1/project');
      const data = await res.json();
      dispatch(setProjectList(data.data || []));
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const inactiveProjects = projectList.filter((project) => project.status === false);

  const handleAccept = async (projectId) => {
    await dispatch(updateProjectStatus({ projectId, status: true }));
    fetchProjects(); 
    toast.success("Approved and shining! This property is ready to be listed.")
  };

  const handleReject = async (projectId) => {
    await dispatch(deleteProject(projectId));
    fetchProjects();
    toast.success( 'Request swept away! The property is now out of the system.')
  };

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900 text-gray-100 p-6 pt-15">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold mx-6 text-gray-800 dark:text-gray-200 ">
          Listing Request Management
        </h1>
      </div>

      {loading ? (
        <p className="text-gray-800 dark:text-white mt-6">Loading...</p>
      ) : error ? (
        <p className="text-red-500 mt-6">Error: {error}</p>
      ) : inactiveProjects.length === 0 ? (
        <p className="text-gray-800 dark:text-white mt-6 px-2">No inactive requests found.</p>
      ) : (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {inactiveProjects.map((project) => (
            <div
              key={project._id}
              className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 shadow-lg rounded-xl p-4 border cursor-pointer"
            >
              <h2 className="text-xl font-semibold">{project.projectname || 'Untitled Project'}</h2>
              <p>Builder: {project.builder || 'N/A'}</p>
              <p className="font-bold">Price: ₹{project.price || '0'}</p>
              <p>BHK: {project.bhk || '-'}</p>

              <div className="mt-3 flex gap-2">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  onClick={() => handleAccept(project._id)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  onClick={() => handleReject(project._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InactiveRequest;
