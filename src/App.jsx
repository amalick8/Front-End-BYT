import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Calendar,
  MessageSquare,
  Bell,
  FileDown,
} from "lucide-react";

import OrgAdminDashboard from "./pages/OrgAdminDashboard";
import VolunteerBuddyManagement from "./pages/VolunteerBuddyManagement";
import BuddyPerformancePanel from "./pages/BuddyPerformancePanel";
import EventsOutreachPanel from "./pages/EventsOutreachPanel";
import CommunicationLogsPanel from "./pages/CommunicationLogsPanel";
import AlertsRemindersPanel from "./pages/AlertsRemindersPanel";
import BuddyResourcesPanel from "./pages/BuddyResourcesPanel";

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50 text-gray-800">
        {/* ======= Sidebar Navigation ======= */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
              Org Admin System
            </h1>
            <p className="text-xs text-gray-500 mt-1">Control Center</p>
          </div>

          {/* Sidebar Links */}
          <nav className="flex-1 p-4 space-y-2">
            <NavItem to="/" icon={<LayoutDashboard size={18} />} label="Dashboard" />
            <NavItem
              to="/volunteer-management"
              icon={<Users size={18} />}
              label="Volunteer & Buddy Management"
            />
            <NavItem
              to="/buddy-performance"
              icon={<BarChart3 size={18} />}
              label="Buddy Performance"
            />
            <NavItem
              to="/events"
              icon={<Calendar size={18} />}
              label="Events & Outreach"
            />
            <NavItem
              to="/communication-logs"
              icon={<MessageSquare size={18} />}
              label="Communication Logs"
            />
            <NavItem
              to="/alerts-reminders"
              icon={<Bell size={18} />}
              label="Alerts & Reminders"
            />
            <NavItem
              to="/buddy-resources"
              icon={<FileDown size={18} />}
              label="Buddy Resources"
            />
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200 text-center text-sm text-gray-500">
            © 2025 Org Admin
          </div>
        </aside>

        {/* ======= Page Content ======= */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<OrgAdminDashboard />} />
            <Route
              path="/volunteer-management"
              element={<VolunteerBuddyManagement />}
            />
            <Route path="/buddy-performance" element={<BuddyPerformancePanel />} />
            <Route path="/events" element={<EventsOutreachPanel />} />
            <Route path="/communication-logs" element={<CommunicationLogsPanel />} />
            <Route path="/alerts-reminders" element={<AlertsRemindersPanel />} />
            <Route path="/buddy-resources" element={<BuddyResourcesPanel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

/* ======= Reusable Sidebar Nav Item ======= */
function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-md transition-all text-sm font-medium ${
          isActive
            ? "bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-md"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}
