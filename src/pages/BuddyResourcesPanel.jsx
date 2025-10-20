import React, { useState } from "react";
import {
  IconButton,
  Tooltip,
  TextField,
  Select,
  InputLabel,
  FormControl,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  FileText,
  MessageCircle,
  FileDown,
  Link as LinkIcon,
  MoreVertical,
} from "lucide-react";

export default function BuddyResourcesPanel() {
  const [resources, setResources] = useState([
    {
      title: "Phone Banking Script",
      type: "Script",
      description: "Step-by-step call instructions",
      action: "Download PDF",
    },
    {
      title: "GOTV SMS Template",
      type: "SMS",
      description: "Pre-approved messaging",
      action: "Copy/Use",
    },
    {
      title: "Voter Reg Lookup Tool",
      type: "Link",
      description: "External voter search tool",
      action: "Open Link",
    },
    {
      title: "Canvassing Checklist",
      type: "PDF",
      description: "Field checklist for buddies",
      action: "Download",
    },
  ]);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const open = Boolean(anchorEl);

  // Dropdown (3-dot menu)
  const handleMenuClick = (event, resource) => {
    setAnchorEl(event.currentTarget);
    setSelectedResource(resource);
  };
  const handleClose = () => setAnchorEl(null);

  const handleDelete = () => {
    setResources(resources.filter((r) => r !== selectedResource));
    handleClose();
  };

  // Filters
  const filteredResources = resources.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) &&
      (typeFilter === "" || r.type === typeFilter)
  );

  // Action handler
  const handleAction = (action, title) => {
    switch (action) {
      case "Download PDF":
      case "Download":
        alert(`Downloading resource: ${title}`);
        break;
      case "Copy/Use":
        navigator.clipboard.writeText(`${title} content copied`);
        alert(`Template copied for: ${title}`);
        break;
      case "Open Link":
        window.open("https://vote.org", "_blank");
        break;
      default:
        alert("Action not recognized");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* ===== Header ===== */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                Buddy Resources Panel
              </h1>
              <p className="text-gray-600">
                Manage official buddy resources and tools.
              </p>
            </div>
          </div>

          {/* ===== Filters ===== */}
          <div className="flex justify-between items-center mb-6">
            <TextField
              label="Search resources..."
              variant="outlined"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "40%" }}
            />
            <FormControl size="small" style={{ width: "180px" }}>
              <InputLabel>Type</InputLabel>
              <Select
                native
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value=""></option>
                <option value="Script">Script</option>
                <option value="SMS">SMS</option>
                <option value="Link">Link</option>
                <option value="PDF">PDF</option>
              </Select>
            </FormControl>
          </div>

          {/* ===== Table ===== */}
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-700 text-left">
                <tr>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4 text-right">More</th>
                </tr>
              </thead>

              <tbody>
                {filteredResources.map((resource, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium flex items-center gap-2">
                      {resource.type === "Script" && (
                        <FileText size={16} className="text-blue-500" />
                      )}
                      {resource.type === "SMS" && (
                        <MessageCircle size={16} className="text-green-500" />
                      )}
                      {resource.type === "PDF" && (
                        <FileDown size={16} className="text-orange-500" />
                      )}
                      {resource.type === "Link" && (
                        <LinkIcon size={16} className="text-teal-500" />
                      )}
                      {resource.title}
                    </td>

                    <td className="py-3 px-4">{resource.type}</td>
                    <td className="py-3 px-4 text-gray-700">
                      {resource.description}
                    </td>

                    <td className="py-3 px-4">
                      <button
                        onClick={() =>
                          handleAction(resource.action, resource.title)
                        }
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-xs"
                      >
                        {resource.action}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <Tooltip title="More actions">
                        <IconButton
                          onClick={(e) => handleMenuClick(e, resource)}
                        >
                          <MoreVertical size={16} />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ===== Dropdown Menu ===== */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem
              onClick={() => {
                alert(`Editing resource: ${selectedResource.title}`);
                handleClose();
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                alert(`Sharing resource: ${selectedResource.title}`);
                handleClose();
              }}
            >
              Share
            </MenuItem>
            <MenuItem onClick={handleDelete} sx={{ color: "red" }}>
              Delete
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
