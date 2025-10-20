import React, { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const VolunteerBuddyManagement = () => {
  const [volunteers, setVolunteers] = useState([
    {
      id: 1,
      name: "John Doe",
      role: "Buddy",
      votersAssigned: 45,
      buddyStatus: "Active",
      lastActivity: "09/22/2025",
      performance: {
        contacted: 38,
        uncontacted: 7,
      },
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Volunteer",
      votersAssigned: 30,
      buddyStatus: "Buddy Pending",
      lastActivity: "09/20/2025",
      performance: {
        contacted: 10,
        uncontacted: 20,
      },
    },
    {
      id: 3,
      name: "Sam Lee",
      role: "Buddy",
      votersAssigned: 20,
      buddyStatus: "Active",
      lastActivity: "09/21/2025",
      performance: {
        contacted: 16,
        uncontacted: 4,
      },
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedBuddy, setSelectedBuddy] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Dummy voter pool
  const [voters] = useState([
    "Ali Khan",
    "Sara Patel",
    "Michael Lee",
    "Priya Desai",
    "Chris Johnson",
    "Maria Lopez",
    "Tom Brown",
  ]);

  const [assignedVoters, setAssignedVoters] = useState([]);

  const filtered = volunteers.filter((v) =>
    v.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMenuToggle = (id, event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenuId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenuId(null);
  };

  const handlePromote = (id) => {
    setVolunteers((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, role: "Buddy", buddyStatus: "Active" } : v
      )
    );
    handleMenuClose();
  };

  const handleAssign = (id) => {
    setSelectedBuddy(id);
    setAssignedVoters([]);
    setShowAssignModal(true);
    handleMenuClose();
  };

  const handleViewProfile = (id) => {
    setSelectedBuddy(volunteers.find((v) => v.id === id));
    setShowProfileModal(true);
    handleMenuClose();
  };

  const handleSaveAssignments = () => {
    setVolunteers((prev) =>
      prev.map((v) =>
        v.id === selectedBuddy
          ? { ...v, votersAssigned: assignedVoters.length }
          : v
      )
    );
    setShowAssignModal(false);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Volunteer & Buddy Management
        </h1>
        <p className="text-gray-600">
          Manage volunteers, buddies, and their assignments.
        </p>
      </div>

      {/* Search + Add */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6 mt-4">
        <h2 className="text-2xl font-semibold text-gray-800">Team Overview</h2>
        <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-2 mt-4 lg:mt-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full lg:w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
            + Add Volunteer
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-y-auto bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Voters Assigned
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Buddy Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Last Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700">{v.name}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        v.role === "Buddy"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {v.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {v.votersAssigned}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        v.buddyStatus === "Active"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {v.buddyStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {v.lastActivity}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <IconButton
                      onClick={(e) => handleMenuToggle(v.id, e)}
                      size="small"
                    >
                      <MoreVert />
                    </IconButton>

                    <Menu
                      anchorEl={anchorEl}
                      open={openMenuId === v.id}
                      onClose={handleMenuClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      {v.role === "Volunteer" ? (
                        <MenuItem onClick={() => handlePromote(v.id)}>
                          Promote to Buddy
                        </MenuItem>
                      ) : (
                        <>
                          <MenuItem onClick={() => handleViewProfile(v.id)}>
                            View Buddy Profile
                          </MenuItem>
                          <MenuItem onClick={() => handleAssign(v.id)}>
                            Assign / Reassign Voters
                          </MenuItem>
                        </>
                      )}
                    </Menu>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No volunteers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Voters Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Assign Voters
            </h3>
            <div className="max-h-60 overflow-y-auto border rounded-md p-3 space-y-2">
              {voters.map((voter) => (
                <label
                  key={voter}
                  className="flex items-center space-x-2 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={assignedVoters.includes(voter)}
                    onChange={(e) =>
                      setAssignedVoters((prev) =>
                        e.target.checked
                          ? [...prev, voter]
                          : prev.filter((p) => p !== voter)
                      )
                    }
                  />
                  <span>{voter}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end space-x-3 mt-5">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAssignments}
                className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Buddy Profile Modal */}
      {showProfileModal && selectedBuddy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {selectedBuddy.name} - Profile
            </h3>
            <p className="text-gray-600 mb-4">
              Role: {selectedBuddy.role} | Status: {selectedBuddy.buddyStatus}
            </p>

            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { day: "Mon", contacted: 5 },
                    { day: "Tue", contacted: 8 },
                    { day: "Wed", contacted: 12 },
                    { day: "Thu", contacted: 16 },
                    { day: "Fri", contacted: 18 },
                    { day: "Sat", contacted: 20 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="contacted"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 text-sm text-gray-700">
              <p>
                <strong>Voters Assigned:</strong>{" "}
                {selectedBuddy.votersAssigned}
              </p>
              <p>
                <strong>Contacted:</strong>{" "}
                {selectedBuddy.performance.contacted}
              </p>
              <p>
                <strong>Uncontacted:</strong>{" "}
                {selectedBuddy.performance.uncontacted}
              </p>
            </div>

            <div className="flex justify-end mt-5">
              <button
                onClick={() => setShowProfileModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerBuddyManagement;
