import React, { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";

export default function EventsOutreachPanel() {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Volunteer Training",
      date: "Sep 25",
      type: "Training",
      invited: 80,
      confirmed: 60,
      attended: 50,
    },
    {
      id: 2,
      name: "GOTV Drive",
      date: "Oct 15",
      type: "Block Walk",
      invited: 120,
      confirmed: 80,
      attended: 70,
    },
    {
      id: 3,
      name: "Phone Bank Blitz",
      date: "Oct 20",
      type: "Phone Bank",
      invited: 100,
      confirmed: 70,
      attended: 65,
    },
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openId, setOpenId] = useState(null);

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setOpenId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenId(null);
  };

  const handleDelete = (id) => {
    setEvents(events.filter((e) => e.id !== id));
    handleMenuClose();
  };

  const handleView = (id) => {
    alert(`Viewing details for event #${id}`);
    handleMenuClose();
  };

  const handleAssign = (id) => {
    alert(`Assigning volunteers to event #${id}`);
    handleMenuClose();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-teal-400 text-white px-8 py-6 shadow">
        <h1 className="text-3xl font-bold">Events & Outreach Panel</h1>
        <p className="text-sm opacity-90">
          Manage volunteer events, training, and community outreach.
        </p>
      </header>

      {/* Top Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-6 gap-4">
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-green-600">3</span> Upcoming Events
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
            + Add New Event
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="px-8 pb-12">
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Event Name",
                    "Date",
                    "Type",
                    "RSVP Summary",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event) => (
                  <tr
                    key={event.id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {event.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {event.date}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          event.type === "Training"
                            ? "bg-blue-100 text-blue-700"
                            : event.type === "Phone Bank"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-teal-100 text-teal-700"
                        }`}
                      >
                        {event.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span className="font-semibold text-gray-900">
                        {event.invited} Invited
                      </span>{" "}
                      / {event.confirmed} Confirmed
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, event.id)}
                      >
                        <MoreVert />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={openId === event.id}
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
                        <MenuItem onClick={() => handleView(event.id)}>
                          View
                        </MenuItem>
                        <MenuItem onClick={() => handleAssign(event.id)}>
                          Assign Volunteers
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleDelete(event.id)}
                          sx={{ color: "red" }}
                        >
                          Delete
                        </MenuItem>
                      </Menu>
                    </td>
                  </tr>
                ))}
                {events.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-6 text-gray-500 italic"
                    >
                      No events found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* RSVP Stats Placeholder */}
      <div className="px-8 pb-12">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            RSVP Tracking Overview
          </h3>
          <p className="text-gray-500 italic">
            Working on this
          </p>
        </div>
      </div>
    </div>
  );
}
