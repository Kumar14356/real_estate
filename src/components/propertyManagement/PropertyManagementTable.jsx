import React, { useEffect, useMemo, useState } from 'react';
import { FaEye } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import usePropertyManagement from '../../Hoocks/usePropertyManagement';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addtoggleInformation, deleteProject, showPropertyInformation } from '../../utils/PropertyManagementSlice';

const PropertyManagementTable = ({ searchQuery, postedByFilter ,statusFilter}) => {
  const dispatch = useDispatch();
  const propertyInformation = useSelector(store => store.PropertyInfo.propertyInformation);
  usePropertyManagement();

  const [localData, setLocalData] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

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

      if (newStatus) {
        toast.success("Property is now Active and visible to users.");
      } else {
        toast.warning("Property is now Inactive and hidden from users.");
      }
    } catch (error) {
      toast.error(error + " Failed to update status.");
    } finally {
      setLoadingId(null);
    }
  };

  const handlePropertInfo = (property) => {
    dispatch(addtoggleInformation());
    dispatch(showPropertyInformation(property));
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

const filteredData = useMemo(() => {
  return localData.filter(item => {
    const matchesSearch = item.projectname?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPostedBy =
      postedByFilter === 'all' ||
      item.postedBy?.toLowerCase() === postedByFilter.toLowerCase();
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'Active' && item.status === true) ||
      (statusFilter === 'Inactive' && item.status === false) ||
      (statusFilter === 'For Sale' && item.saleType === 'For Sale') ||
      (statusFilter === 'For Rent' && item.saleType === 'For Rent');
    return matchesSearch && matchesPostedBy && matchesStatus;
  });
}, [localData, searchQuery, postedByFilter, statusFilter]);

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, postedByFilter]);

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
          {currentData.length === 0 ? (
            <tr>
              <td colSpan="7" className="py-10 text-center">
                <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 9.75h.008v.008H9.75V9.75zM3 17.25l5.25-5.25M12 3v1.5M21 12h-1.5M4.5 12H3m9 9v-1.5M17.25 3l-5.25 5.25M21 4.5l-5.25 5.25M3 4.5l5.25 5.25" />
                  </svg>
                  <p className="text-lg font-semibold">No Properties Found</p>
                  <p className="text-sm mt-1">Try adjusting your filters or search query.</p>
                </div>
              </td>
            </tr>
          ) : (
            currentData
             .filter(property => property.status === true) 
            .map(property => (
              <tr key={property._id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                <td className="px-4 py-3 whitespace-nowrap text-gray-900 dark:text-gray-100">{property.projectname}</td>
                <td className="px-4 py-3">
                  <select
                    value={property.status ? "Active" : "Inactive"}
                    onChange={(e) => updateStatus(property._id, e.target.value)}
                    disabled={loadingId === property._id}
                    className="border rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm"
                  >
                    {loadingId === property._id ? (
                      <option>Updating...</option>
                    ) : (
                      <>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </>
                    )}
                  </select>
                </td>
                <td className="px-4 py-3 text-gray-900 dark:text-gray-100">{property.city}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-gray-100">{property.builtupArea || '1200 Sq.ft'}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-gray-100">{property.superBuiltup || '1800 Sq.ft'}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-gray-100">{property.furnishing || 'Unfurnished'}</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center items-center gap-3">
                    <button className="text-green-500 text-xl hover:text-green-600 transition" onClick={() => handlePropertInfo(property)}>
                      <FaEye />
                    </button>
                    <button className="text-red-500 text-xl hover:text-red-600 transition" onClick={() => handleDelete(property._id)}>
                      <RiDeleteBin5Line />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {filteredData.length > rowsPerPage && (
        <div className="flex justify-center items-center gap-2 p-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map(num => (
            <button
              key={num}
              onClick={() => setCurrentPage(num + 1)}
              className={`px-3 py-1 rounded ${currentPage === num + 1
                ? 'bg-green-500 text-white '
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                } hover:bg-gray-300 dark:hover:bg-gray-600`}
            >
              {num + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyManagementTable;