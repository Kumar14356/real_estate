import React, { useEffect, useState } from 'react';
import { FaEye } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import usePropertyManagement from '../../Hoocks/usePropertyManagement';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addtoggleInformation, deleteProject } from '../../utils/PropertyManagementSlice';

const PropertyManagementTable = () => {
  const dispatch = useDispatch();
  const propertyInformation = useSelector(store => store.PropertyInfo.propertyInformation);
  usePropertyManagement(); // Load data on mount

  const [localData, setLocalData] = useState([]);
  const [loadingId, setLoadingId] = useState(null); // ID currently being updated

  useEffect(() => {
    if (Array.isArray(propertyInformation)) {
      setLocalData(propertyInformation);
    }
  }, [propertyInformation]);

  const updateStatus = async (id, selectedValue) => {
    const newStatus = selectedValue === "Active";
    setLoadingId(id);

    try {
      const response = await fetch(`https://realstate-2.onrender.com/api/v1/project/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const responseText = await response.text();
      if (!response.ok) {
        throw new Error(`Failed: ${response.status} - ${responseText}`);
      }


      setLocalData(prev =>
        prev.map(item =>
          item._id === id ? { ...item, status: newStatus } : item
        )
      );

      toast.success(`Project status updated to ${newStatus ? 'Active' : 'Inactive'}`);
    } catch (error) {
      console.error('Error updating status:', error.message);
      toast.error("Failed to update status.");
    } finally {
      setLoadingId(null);
    }
  };

  const handlePropertInfo = () => {
    dispatch(addtoggleInformation());
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    try {
      await dispatch(deleteProject(id)).unwrap();
      toast.success("Project deleted successfully");

      // Remove deleted item from local state
      setLocalData(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.error('Delete error:', error);
      toast.error("Failed to delete project");
    }
  };

  return (
    <div className="">
      <div className="my-10 overflow-x-auto rounded-2xl mx-10">
        <table className="min-w-full shadow">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="text-left py-3 px-6">Project Name</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Location</th>
              <th className="text-left py-3 px-4">Built-up Area</th>
              <th className="text-left py-3 px-4">Super Built-up Area</th>
              <th className="text-left py-3 px-4">Furnishing</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {localData.map(property => (
              <tr key={property._id} className="bg-white border-b dark:border-gray-700">
                <td className="px-6 py-4 text-sm font-medium">{property.projectname}</td>

                <td className="px-4 py-4">
                  <select
                    value={property.status ? "Active" : "Inactive"}
                    onChange={(e) => updateStatus(property._id, e.target.value)}
                    disabled={loadingId === property._id}
                    className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </td>

                <td className="px-4 py-4 text-sm">{property.city}</td>
                <td className="px-4 py-4 text-sm">1200 Sq.ft</td>
                <td className="px-4 py-4 text-sm">1800 Sq.ft</td>
                <td className="px-4 py-4 text-sm">Unfurnished</td>

                <td className="px-6 py-4 text-center">
                  <div className="flex space-x-3">
                    <button
                      className="text-green-500 text-2xl cursor-pointer"
                      onClick={handlePropertInfo}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="text-red-500 text-2xl cursor-pointer"
                      onClick={() => handleDelete(property._id)}
                    >
                      <RiDeleteBin5Line />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default PropertyManagementTable;