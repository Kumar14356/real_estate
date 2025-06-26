import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toogleUserInfo } from "../../utils/userSlice";
import useUserManagemnt from "../../Hoocks/useUserManagemnt";
import { showuserInformation } from "../../utils/ManagementSlice";

const USERS_PER_PAGE = 7;

const ManagemntTable = () => {
  const dispatch = useDispatch();
  useUserManagemnt();

  const manageUser = useSelector((store) => store.manageUser.userProfile) || [];
  const searchQuery = useSelector((store) => store.manageUser.searchQuery) || "";
  const statusFilter = useSelector((store) => store.manageUser.statusFilter) || "all";

  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = Array.isArray(manageUser)
    ? manageUser.filter((user) => {
        const name = user.username || "";
        const status = user.isActive ? "active" : "inactive";
        const matchesName = name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
          statusFilter === "all" || status === statusFilter.toLowerCase();
        return matchesName && matchesStatus;
      })
    : [];

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + USERS_PER_PAGE);

  const showUserInfo = (user) => {
    dispatch(toogleUserInfo());
    dispatch(showuserInformation(user));
  };

  const handlePageClick = (page) => setCurrentPage(page);

  const renderPagination = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-3 py-1 rounded-md border text-sm ${
            currentPage === i
              ? "bg-green-500 text-white dark:hover:text-white"
              : "bg-white text-gray-700 hover:bg-green-500 dark:bg-gray-700 dark:text-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex justify-center mt-4 gap-2 flex-wrap">
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 border rounded-md text-sm ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-800 "
              : "bg-white text-gray-700 hover:bg-green-500 dark:bg-gray-800 dark:text-white"
          }`}
        >
          Previous
        </button>
        {pages}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 border rounded-md text-sm ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-800"
              : "bg-white text-gray-700 hover:bg-green-500 dark:bg-gray-800 dark:text-white"
          }`}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="px-2 sm:px-10">
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">User Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Role</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-10 text-center">
                  <div className="flex flex-col items-center text-gray-500">
                    <img
                      src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-9887573-8019254.png"
                      alt="No data"
                      className="w-40 mb-4"
                    />
                    <p className="text-lg font-semibold">No users found</p>
                    <p className="text-sm text-gray-400">
                      Try adjusting your search or check back later.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">{user.username || "N/A"}</td>
                  <td className="px-6 py-4">{user.isActive ? "Active" : "Inactive"}</td>
                  <td className="px-6 py-4">{user.phone_no || "N/A"}</td>
                  <td className="px-6 py-4">{user.email || "N/A"}</td>
                  <td className="px-6 py-4">{user.broker === "Yes" ? "Broker" : "User"}</td>
                  <td className="px-6 py-4 text-xl">
                    <button
                      onClick={() => showUserInfo(user)}
                      className="text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Property-style pagination */}
      {filteredUsers.length > USERS_PER_PAGE && renderPagination()}
    </div>
  );
};

export default ManagemntTable;
