import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toogleUserInfo } from "../../utils/userSlice";
import useUserManagemnt from "../../Hoocks/useUserManagemnt";
import { showuserInformation } from "../../utils/ManagementSlice";
  


const USERS_PER_PAGE = 7;

const ManagemntTable = () => {
  const dispatch = useDispatch();
  useUserManagemnt(); // fetch user data on load

  const manageUser = useSelector((store) => store.manageUser.userProfile) || [];
  const searchQuery = useSelector((store) => store.manageUser.searchQuery) || "";
  const statusFilter = useSelector((store) => store.manageUser.statusFilter) || "all";

  const [currentPage, setCurrentPage] = useState(1);

  // Filter users safely
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

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="px-2 sm:px-10">
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 no-scroll  ">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-green-600 dark:hover-green-400">User Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-green-600 dark:hover-green-400">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-green-600 dark:hover-green-400">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-green-600 dark:hover-green-400">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-green-600 dark:hover-green-400">Role</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-green-600 dark:hover-green-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedUsers.length === 0 ? (
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
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
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{user.phone_no || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{user.email || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{user.broker === "Yes" ? "Broker" : "User"}</td>
                  <td
                    className="px-6 py-4 text-xl whitespace-nowrap"
                    
                  >
                    <button onClick={() => showUserInfo(user)} className="text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                    <FaEye />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {filteredUsers.length > USERS_PER_PAGE && (
        <div className="flex justify-center mt-4 gap-4 flex-wrap">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            Previous
          </button>
          <span className="self-center text-sm text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ManagemntTable; 