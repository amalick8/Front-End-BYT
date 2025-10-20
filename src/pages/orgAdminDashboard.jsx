import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area,
} from "recharts";
import { Users, Bell, RefreshCw, ChevronRight, ChevronLeft, TrendingUp, UserCheck, DollarSign } from "lucide-react";

export default function OrgAdminDashboard() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedStat, setSelectedStat] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const stats = [
    { id: 0, label: "Total Voters", value: "2,500", change: "15+ Increased from last month", gradient: true, icon: TrendingUp },
    { id: 1, label: "Total Volunteers", value: "180", change: "15+ Increased from last month", gradient: false, icon: Users },
    { id: 2, label: "Active Volunteers", value: "120", change: "15+ Increased from last month", gradient: false, icon: UserCheck },
    { id: 3, label: "Total Donors", value: "180", change: "15+ Increased from last month", gradient: false, icon: DollarSign },
  ];

  const contactData = [
    { name: "Contacted", value: 75 },
    { name: "Uncontacted", value: 25 },
  ];
  const COLORS = ["#14b8a6", "#3b82f6"]; 

  const performanceData = [
    { name: "Sun", value: 2745 },
    { name: "Mon", value: 2100 },
    { name: "Tue", value: 1850 },
    { name: "Wed", value: 1650 },
    { name: "Thu", value: 1200 },
    { name: "Fri", value: 1650 },
    { name: "Sat", value: 1650 },
  ];

  const events = [
    { title: "Lorem ipsum", subtitle: "Lorem ipsum", detail: "Lorem ipsum", important: true },
    { title: "Lorem ipsum", subtitle: "Lorem ipsum", detail: "Lorem ipsum", important: false },
    { title: "Lorem ipsum", subtitle: "Lorem ipsum", detail: "Lorem ipsum", important: true },
    { title: "Lorem ipsum", subtitle: "Lorem ipsum", detail: "Lorem ipsum", important: true },
    { title: "Lorem ipsum", subtitle: "Lorem ipsum", detail: "Lorem ipsum", important: true },
    { title: "Lorem ipsum", subtitle: "Lorem ipsum", detail: "Lorem ipsum", important: true },
    { title: "Lorem ipsum", subtitle: "Lorem ipsum", detail: "Lorem ipsum", important: true },
    { title: "Lorem ipsum", subtitle: "Lorem ipsum", detail: "Lorem ipsum", important: true },
    { title: "Lorem ipsum", subtitle: "Lorem ipsum", detail: "Lorem ipsum", important: true },
  ];

  const interactionData = [
    { SMS: 65, Emails: 45, Calls: 55, Visits: 35 },
    { SMS: 72, Emails: 52, Calls: 62, Visits: 48 },
    { SMS: 78, Emails: 58, Calls: 68, Visits: 52 },
    { SMS: 68, Emails: 62, Calls: 58, Visits: 58 },
    { SMS: 82, Emails: 55, Calls: 72, Visits: 62 },
  ];

  const resources = [
    { icon: "📄", title: "Official Voter Registration", type: "Website" },
    { icon: "📍", title: "Find Your Polling Place", type: "Places" },
    { icon: "📄", title: "Government Rules", type: "Website" },
    { icon: "📍", title: "Find Nearest Voting Place", type: "Places" },
  ];

  const handleStatClick = (id) => {
    setSelectedStat(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* toggle button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-50 bg-gradient-to-r from-blue-500 to-teal-400 text-white p-3 rounded-r-lg shadow-lg hover:shadow-xl transition-all"
      >
        {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* sidebar */}
      <aside className={`w-64 bg-white border-r border-gray-200 fixed h-full transition-transform duration-300 z-40 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
          <nav className="space-y-2">
            {stats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <button
                  key={stat.id}
                  onClick={() => handleStatClick(stat.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    selectedStat === stat.id
                      ? "bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-md"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent size={20} className={selectedStat === stat.id ? "text-white" : "text-gray-600"} />
                    <div>
                      <p className="text-sm font-medium">{stat.label}</p>
                      <p className={`text-xs ${selectedStat === stat.id ? "text-white/80" : "text-gray-500"}`}>
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* main content */}
      <div className="flex-1">
        <header className="bg-gradient-to-r from-blue-500 to-teal-400 text-white px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Voter Buddy System</h1>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 cursor-pointer" />
            <div className="relative">
              <div 
                className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="User"
                  className="w-10 h-10 rounded-full bg-white"
                />
                <div>
                  <p className="font-medium text-sm">Christopher Thomas</p>
                  <p className="text-xs opacity-90">Org Name</p>
                </div>
              </div>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-10">
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      console.log('signing out...');
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Org Admin Dashboard</h2>
              <p className="text-sm text-gray-600 mt-1">Find a buddy. Stay on track. Vote together.</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-gradient-to-r from-blue-500 to-teal-400 hover:opacity-90 text-white font-medium rounded-md px-4 py-2 flex items-center gap-2">
                <Users size={18} /> Add Buddy
              </button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md px-4 py-2 flex items-center gap-2">
                <span>🚀</span> Invite Your Buddy
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md px-4 py-2">
                Upload
              </button>
            </div>
          </div>
        </div>

        <section className="px-8 py-6">
          <div className="grid grid-cols-4 gap-4">
            {stats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={stat.id}
                  className={`${
                    stat.gradient
                      ? "bg-gradient-to-r from-blue-500 to-teal-400 text-white"
                      : "bg-white text-gray-900"
                  } rounded-lg p-5 shadow-sm border border-gray-100 relative transition-all ${
                    selectedStat === stat.id ? "ring-4 ring-blue-400 ring-offset-2" : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <IconComponent size={28} className={stat.gradient ? "text-white" : "text-gray-400"} />
                    <RefreshCw className={`w-4 h-4 ${stat.gradient ? "text-white" : "text-gray-400"}`} />
                  </div>
                  <p className={`text-sm mb-2 ${stat.gradient ? "text-white/90" : "text-gray-600"}`}>
                    {stat.label}
                  </p>
                  <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      stat.gradient ? "bg-white/20" : "bg-teal-100 text-teal-700"
                    }`}>
                      15+
                    </span>
                    <span className={`text-xs ${stat.gradient ? "text-white/90" : "text-gray-500"}`}>
                      Increased from last month
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="px-8 pb-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Contacted vs Uncontacted</h3>
                <RefreshCw className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center gap-8">
                <div className="relative">
                  <ResponsiveContainer width={160} height={160}>
                    <PieChart>
                      <Pie
                        data={contactData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={50}
                        outerRadius={70}
                        startAngle={90}
                        endAngle={-270}
                      >
                        {contactData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">75%</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-sm bg-teal-500"></div>
                    <span className="text-sm text-gray-700">Total Contacted 1,450</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-sm bg-blue-500"></div>
                    <span className="text-sm text-gray-700">Total Uncontacted 1,050</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Buddy Performance</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded">15+</span>
                  <span className="text-xs text-gray-500">Increased from last month</span>
                  <RefreshCw className="w-4 h-4 text-gray-400 ml-2" />
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={performanceData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip />
                  <Bar dataKey="value" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={1} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.3} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="px-8 pb-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
                <RefreshCw className="w-4 h-4 text-gray-400" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {events.map((event, i) => (
                  <div key={i} className="space-y-1 border-l-2 border-teal-400 pl-3">
                    <p className="text-sm font-medium text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-600">{event.subtitle}</p>
                    <p className="text-xs text-gray-600">{event.detail}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-teal-400 rounded-sm"></div>
                  <span className="text-gray-600">Important</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
                  <span className="text-gray-600">Not Important</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Interaction Types</h3>
                <RefreshCw className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-3">
                {["SMS", "Emails", "Calls", "Visits"].map((type, idx) => (
                  <div key={type}>
                    <div className="text-xs text-gray-700 mb-1">{type}</div>
                    <ResponsiveContainer width="100%" height={50}>
                      <AreaChart data={interactionData}>
                        <defs>
                          <linearGradient id={`gradient${idx}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={idx % 2 === 0 ? "#14b8a6" : "#3b82f6"} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={idx % 2 === 0 ? "#14b8a6" : "#3b82f6"} stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey={type}
                          stroke={idx % 2 === 0 ? "#14b8a6" : "#3b82f6"}
                          fill={`url(#gradient${idx})`}
                          strokeWidth={2}
                          dot={{ r: 3, fill: idx % 2 === 0 ? "#14b8a6" : "#3b82f6" }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-8 pb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-semibold text-gray-900">Buddy Resources</h3>
                <button className="px-4 py-1 bg-blue-500 text-white text-sm rounded-md">
                  Official Sites
                </button>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50">
                  + Add Links
                </button>
                <button className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {resources.map((resource, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-md">
                  <span className="text-2xl">{resource.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{resource.title}</p>
                    <p className="text-xs text-gray-500">{resource.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}