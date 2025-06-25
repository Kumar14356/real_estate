import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import useUserManagement from "../../Hoocks/useUserManagemnt";

const Notification = () => {
  useUserManagement()
  const rawUserProfiles = useSelector((state) => state.manageUser.userProfile);

  const userProfiles = useMemo(() => rawUserProfiles || [], [rawUserProfiles]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");

  const filteredUsers = userProfiles.filter((user) => {
    const fullName = `${user.username || ""}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  const toggleUser = (_id) => {
    setSelectedUsers((prev) =>
      prev.includes(_id) ? prev.filter((uid) => uid !== _id) : [...prev, _id]
    );
  };

  const selectAll = () => {
    const allIds = filteredUsers.map((user) => user._id);
    setSelectedUsers(allIds);
  };

  const deselectAll = () => {
    setSelectedUsers([]);
  };

  const handleSend = async () => {
    if (!title || !description || selectedUsers.length === 0) {
      alert("Please fill in all fields and select recipients.");
      return;
    }

    try {
      const response = await fetch("https://realstate-2.onrender.com/api/v1/notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title:title,
          message: description,
          userIds: selectedUsers,
        }),
      });
   
      if (response.ok) {
        alert("✅ Notification sent successfully");
        setTitle("");
        setDescription("");
        setSelectedUsers([]);
      } else {
        alert("❌ Failed to send notification");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("❌ Failed to send notification. Please check your server.");
    }
  };

  return (
    <div className="flex h-screen">
      <main className="flex-1 p-6 bg-gray-200 overflow-auto dark:bg-gray-900  dark:text-gray-200 pt-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Notification Center</h1>

        <div className="mb-4 flex space-x-2">
          <button className="bg-blue-600 text-white px-6 py-4 rounded-2xl">
            Create Notification
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded dark:bg-gray-800 text-gray-200">
            Notification History
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 dark:bg-gray-800 px-3">
          {/* Left: Notification Form */}
          <div className="bg-white rounded-xl p-6 shadow-lg h-[550px] dark:bg-gray-700">
            <h2 className="text-lg font-medium mb-4">Create Notification</h2>
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Notification Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-200"
              />
              <textarea
                placeholder="Notification Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-200 h-32"
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-6 py-4 rounded-2xl mt-2"
              >
                ➤ Send Notification
              </button>
            </div>
          </div>

          {/* Right: Recipient List */}
          <div className="bg-white rounded-xl p-4 shadow-lg h-[550px] dark:bg-gray-700">
            <h2 className="text-lg font-medium mb-4">Select Recipient</h2>
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 pl-4 p-3 mb-4 rounded-xl"
            />
            <div className="flex items-center mb-4 space-x-6">
              <button onClick={selectAll} className="text-blue-600 text-sm">
                Select All
              </button>
              <button onClick={deselectAll} className="text-red-600 text-sm">
                Deselect All
              </button>
            </div>
            <div className="h-80 overflow-y-scroll border border-gray-200 rounded p-2 bg-gray-50 dark:bg-gray-700">
              {filteredUsers.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/7486/7486790.png"
                    alt="No users found"
                    className="w-32 h-32 mb-4 opacity-70"
                  />
                  <p className="text-lg font-semibold">No users found</p>
                  <p className="text-sm">Try a different search term.</p>
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <label key={user._id} className="block border-b border-gray-300 py-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">
                          {user.username || "N/A"}
                        </p>
                        <p className="text-sm text-gray-600">
                          Status:{" "}
                          {user.status === true
                            ? "Inactive"
                            : user.status === false
                              ? "Active"
                              : "N/A"}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user._id)}
                        onChange={() => toggleUser(user._id)}
                      />
                    </div>
                  </label>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notification;