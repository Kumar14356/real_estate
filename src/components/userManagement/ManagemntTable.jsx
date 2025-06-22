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
        const name = user.full_name || "";
        const status = user.status || "";
        const matchesName = name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
          statusFilter === "all" || status.toLowerCase() === statusFilter;
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
      <div className="overflow-x-auto rounded-2xl">
        <table className="min-w-[1000px] w-full text-left text-xs sm:text-sm border-collapse bg-white table-auto">
          <thead className="sticky top-0 bg-gray-100 z-10">
            <tr className="border-b border-gray-300 h-15 font-semibold text-gray-700">
              <th className="px-4">User Name</th>
              <th className="px-4">Status</th>
              <th className="px-4">Phone</th>
              <th className="px-4">Email</th>
              <th className="px-4">Role</th>
              <th className="px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
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
                <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50 h-15">
                  <td className="px-4 py-2 whitespace-nowrap">{user.username || "N/A"}</td>
                  <td className="px-4 py-2">{user.status || "N/A"}</td>
                  <td className="px-4 py-2">{user.phone_no || "N/A"}</td>
                  <td className="px-4 py-2 truncate max-w-[200px]">{user.email_id || "N/A"}</td>
                  <td className="px-4 py-2">{user.broker === "Yes" ? "Broker" : "User"}</td>
                  <td
                    className="px-4 py-2 text-xl text-black cursor-pointer hover:text-green-800"
                    onClick={() => showUserInfo(user)}
                  >
                    <FaEye />
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