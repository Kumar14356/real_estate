import React, { useEffect, useState } from 'react';
import { FaEye } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import usePropertyManagement from '../../Hoocks/usePropertyManagement';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addtoggleInformation, deleteProject } from '../../utils/PropertyManagementSlice';

const PropertyManagementTable = ({ searchQuery, statusFilter, postedByFilter }) => {
  const dispatch = useDispatch();
  const propertyInformation = useSelector(store => store.PropertyInfo.propertyInformation);
  usePropertyManagement();

  const [localData, setLocalData] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Update failed");

      setLocalData(prev =>
        prev.map(item =>
          item._id === id ? { ...item, status: newStatus } : item
        )
      );

      toast.success(`Project status updated to ${newStatus ? 'Active' : 'Inactive'}`);
    } catch (error) {
      toast.error(error + " Failed to update status.");
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
      setLocalData(prev => prev.filter(item => item._id !== id));
    } catch {
      toast.error("Failed to delete project");
    }
  };

  const filteredData = localData.filter(item => {
    const matchesSearch = item.projectname?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'Active' && item.status === true) ||
      (statusFilter === 'Inactive' && item.status === false) ||
      (item.statusType?.toLowerCase() === statusFilter.toLowerCase());

    const matchesPostedBy =
      postedByFilter === 'all' ||
      item.postedBy?.toLowerCase() === postedByFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesPostedBy;
  });

  return (
    <div className="w-full overflow-x-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">Project Name</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">Status</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">Location</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">Built-up Area</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">Super Built-up</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">Furnishing</th>
            <th className="px-4 py-3 text-center font-semibold text-gray-600 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(property => (
            <tr key={property._id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
              <td className="px-4 py-3 whitespace-nowrap text-gray-900 dark:text-gray-100">{property.projectname}</td>
              <td className="px-4 py-3">
                <select
                  value={property.status ? "Active" : "Inactive"}
                  onChange={(e) => updateStatus(property._id, e.target.value)}
                  disabled={loadingId === property._id}
                  className="border rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </td>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">{property.city}</td>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">1200 Sq.ft</td>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">1800 Sq.ft</td>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">Unfurnished</td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center items-center gap-3">
                  <button className="text-green-500 text-xl" onClick={() => handlePropertInfo(property)}>
                    <FaEye />
                  </button>
                  <button className="text-red-500 text-xl" onClick={() => handleDelete(property._id)}>
                    <RiDeleteBin5Line />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyManagementTable;