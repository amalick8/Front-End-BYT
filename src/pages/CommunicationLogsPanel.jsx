import React, { useState } from "react";
import { IconButton, Menu, MenuItem, TextField, Select, InputLabel, FormControl } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

export default function CommunicationLogsPanel() {
  const [logs, setLogs] = useState([
    { date: "Sep 20", voter: "Maria Lopez", buddy: "John Doe", type: "SMS", status: "Delivered", notes: "Followed up via SMS" },
    { date: "Sep 18", voter: "Kevin White", buddy: "Sam Lee", type: "Call", status: "Voicemail", notes: "Left message" },
    { date: "Sep 17", voter: "Linda Green", buddy: "Jane Smith", type: "Call", status: "Not Answered", notes: "" },
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLog, setSelectedLog] = useState(null);
  const [filters, setFilters] = useState({
    voter: "",
    buddy: "",
    type: "",
    status: "",
    showFollowUps: false,
    showUncontacted: false,
    sortBy: "desc",
  });

  const open = Boolean(anchorEl);
  const handleMenuClick = (event, log) => {
    setAnchorEl(event.currentTarget);
    setSelectedLog(log);
  };
  const handleClose = () => setAnchorEl(null);

  const handleDelete = () => {
    setLogs((prev) => prev.filter((l) => l !== selectedLog));
    handleClose();
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleCheckboxToggle = (name) => {
    setFilters((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  // filtering logic
  const filteredLogs = logs
    .filter((l) => (!filters.voter || l.voter.toLowerCase().includes(filters.voter.toLowerCase())))
    .filter((l) => (!filters.buddy || l.buddy.toLowerCase().includes(filters.buddy.toLowerCase())))
    .filter((l) => (!filters.type || l.type === filters.type))
    .filter((l) => (!filters.status || l.status === filters.status))
    .filter((l) => (!filters.showFollowUps || l.notes.toLowerCase().includes("follow")))
    .filter((l) => (!filters.showUncontacted || l.status === "Not Answered"))
    .sort((a, b) =>
      filters.sortBy === "desc"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1 bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                Communication Logs Panel
              </h1>
              <p className="text-gray-600">Monitor all voter-buddy communications in one place.</p>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            <TextField
              label="Voter"
              name="voter"
              variant="outlined"
              size="small"
              value={filters.voter}
              onChange={handleFilterChange}
            />
            <TextField
              label="Buddy"
              name="buddy"
              variant="outlined"
              size="small"
              value={filters.buddy}
              onChange={handleFilterChange}
            />
            <FormControl size="small">
              <InputLabel>Type</InputLabel>
              <Select
                native
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
              >
                <option value=""></option>
                <option value="SMS">SMS</option>
                <option value="Call">Call</option>
                <option value="Email">Email</option>
              </Select>
            </FormControl>
            <FormControl size="small">
              <InputLabel>Status</InputLabel>
              <Select
                native
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value=""></option>
                <option value="Delivered">Delivered</option>
                <option value="Voicemail">Voicemail</option>
                <option value="Not Answered">Not Answered</option>
              </Select>
            </FormControl>
            <FormControl size="small">
              <InputLabel>Sort By</InputLabel>
              <Select
                native
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </Select>
            </FormControl>
          </div>

          {/* Quick Toggles */}
          <div className="flex gap-4 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.showFollowUps}
                onChange={() => handleCheckboxToggle("showFollowUps")}
              />
              <span className="text-sm text-gray-700">Show only follow-ups</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.showUncontacted}
                onChange={() => handleCheckboxToggle("showUncontacted")}
              />
              <span className="text-sm text-gray-700">Show only uncontacted</span>
            </label>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-700 text-left">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Voter Name</th>
                  <th className="py-3 px-4">Buddy</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Notes</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4">{log.date}</td>
                    <td className="py-3 px-4 font-medium">{log.voter}</td>
                    <td className="py-3 px-4">{log.buddy}</td>
                    <td className="py-3 px-4">{log.type}</td>
                    <td
                      className={`py-3 px-4 font-semibold ${
                        log.status === "Delivered"
                          ? "text-green-600"
                          : log.status === "Voicemail"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {log.status}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{log.notes || "-"}</td>
                    <td className="py-3 px-4 text-right">
                      <IconButton onClick={(e) => handleMenuClick(e, log)}>
                        <MoreVert fontSize="small" />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem
              onClick={() => {
                alert(`Viewing log for ${selectedLog.voter}`);
                handleClose();
              }}
            >
              View
            </MenuItem>
            <MenuItem
              onClick={() => {
                alert(`Editing ${selectedLog.voter}'s log`);
                handleClose();
              }}
            >
              Edit
            </MenuItem>
            <MenuItem onClick={handleDelete} className="text-red-500">
              Delete
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
