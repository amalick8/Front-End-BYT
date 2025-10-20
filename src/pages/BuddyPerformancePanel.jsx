import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function BuddyPerformancePanel() {
  const data = [
    {
      name: "John Doe",
      assigned: 45,
      contacted: 38,
      followUps: 4,
      performance: 84,
    },
    {
      name: "Sam Lee",
      assigned: 20,
      contacted: 12,
      followUps: 6,
      performance: 60,
    },
    {
      name: "Jane Smith",
      assigned: 30,
      contacted: 8,
      followUps: 18,
      performance: 27,
    },
  ];

  const totalAssigned = data.reduce((a, b) => a + b.assigned, 0);
  const avgPerformance = Math.round(
    data.reduce((a, b) => a + b.performance, 0) / data.length
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-teal-400 text-white px-8 py-6 shadow">
        <h1 className="text-3xl font-bold">Buddy Assignments Performance Panel</h1>
        <p className="text-sm opacity-90">
          Track buddy engagement and follow-up efficiency in real time.
        </p>
      </header>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-sm text-gray-500">Total Buddies</h3>
          <p className="text-2xl font-bold text-gray-800">{data.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-sm text-gray-500">Total Assigned Voters</h3>
          <p className="text-2xl font-bold text-gray-800">{totalAssigned}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-sm text-gray-500">Average Performance</h3>
          <p className="text-2xl font-bold text-gray-800">{avgPerformance}%</p>
        </div>
      </div>

      {/* Data Table */}
      <div className="px-8 pb-8">
        <div className="bg-white border border-gray-200 shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Buddy Name",
                    "Assigned Voters",
                    "Contacted",
                    "Follow-ups Pending",
                    "Performance (%)",
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
              <tbody className="divide-y divide-gray-200">
                {data.map((row) => (
                  <tr
                    key={row.name}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {row.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {row.assigned}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {row.contacted}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {row.followUps}
                    </td>
                    <td
                      className={`px-6 py-4 text-sm font-semibold ${
                        row.performance >= 70
                          ? "text-green-600"
                          : row.performance >= 40
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {row.performance}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 pb-12">
        {/* Assigned vs Contacted */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Assigned vs Contacted
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="assigned" fill="#60a5fa" name="Assigned Voters" />
              <Bar dataKey="contacted" fill="#10b981" name="Contacted" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stacked Bar: Contacted/Follow-ups */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Contacted / Follow-up / Uncontacted
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="contacted" stackId="a" fill="#22c55e" name="Contacted" />
              <Bar dataKey="followUps" stackId="a" fill="#facc15" name="Follow-ups" />
              <Bar
                dataKey={(d) => d.assigned - (d.contacted + d.followUps)}
                stackId="a"
                fill="#f87171"
                name="Uncontacted"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Heatmap Placeholder */}
      <div className="px-8 pb-12">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Engagement Heatmap by Precinct
          </h3>
          <div className="h-64 flex items-center justify-center text-gray-500 italic bg-gray-50 rounded-lg border">
            ****Figuring out how to do this****
          </div>
        </div>
      </div>
    </div>
  );
}
