import React, { useState } from "react";
import { IconButton, Menu, MenuItem, TextField, Select, InputLabel, FormControl } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

export default function AlertsRemindersPanel() {
  const [alerts, setAlerts] = useState([
    {
      icon: "🛑",
      type: "Inactive Buddy",
      description: "No activity from Jane Smith in 5 days",
      assignedTo: "Org Admin",
      date: "Sep 25",
      status: "Pending",
    },
    {
      icon: "⏰",
      type: "Follow-up Reminder",
      description: "Kevin White needs follow-up",
      assignedTo: "John Doe",
      date: "Sep 24",
      status: "Sent",
    },
    {
      icon: "⚠️",
      type: "Uncontacted Voters",
      description: "150 voters have not been contacted",
      assignedTo: "Org Admin",
      date: "Sep 23",
      status: "Pending",
    },
    {
      icon: "📅",
      type: "Event Reminder",
      description: "GOTV Drive coming up Oct 15",
      assignedTo: "All RSVPed",
      date: "Sep 27",
      status: "Sent",
    },
  ]);

  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event, alert) => {
    setAnchorEl(event.currentTarget);
    setSelectedAlert(alert);
  };
  const handleClose = () => setAnchorEl(null);

  const handleDelete = () => {
    setAlerts(alerts.filter((a) => a !== selectedAlert));
    handleClose();
  };

  const filteredAlerts = alerts.filter(
    (a) =>
      a.type.toLowerCase().includes(filter.toLowerCase()) &&
      (statusFilter === "" || a.status === statusFilter)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                Alerts & Reminders Panel
              </h1>
              <p className="text-gray-600">Monitor active system alerts and reminders.</p>
            </div>
          </div>

          {/* Top Filter Bar */}
          <div className="flex justify-between items-center mb-6">
            <TextField
              label="Search alerts..."
              variant="outlined"
              size="small"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ width: "40%" }}
            />
            <FormControl size="small" style={{ width: "180px" }}>
              <InputLabel>Status</InputLabel>
              <Select
                native
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value=""></option>
                <option value="Pending">Pending</option>
                <option value="Sent">Sent</option>
              </Select>
            </FormControl>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-700 text-left">
                <tr>
                  <th className="py-3 px-4">Alert Type</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Assigned To</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAlerts.map((alert, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 flex items-center gap-2">
                      <span className="text-xl">{alert.icon}</span>
                      <span className="font-medium text-gray-900">{alert.type}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{alert.description}</td>
                    <td className="py-3 px-4 text-gray-600">{alert.assignedTo}</td>
                    <td className="py-3 px-4 text-gray-600">{alert.date}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          alert.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {alert.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <IconButton onClick={(e) => handleMenuClick(e, alert)}>
                        <MoreVert fontSize="small" />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Actions Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem
              onClick={() => {
                alert(`Viewing details for "${selectedAlert.type}"`);
                handleClose();
              }}
            >
              View
            </MenuItem>
            <MenuItem
              onClick={() => {
                alert(`Resending reminder for "${selectedAlert.type}"`);
                handleClose();
              }}
            >
              Resend
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
