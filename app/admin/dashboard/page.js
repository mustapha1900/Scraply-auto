import { getLeadsStats } from "@/lib/queries/leads"
import Link from "next/link"

export const metadata = { title: "Dashboard" }

const statusColors = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-amber-100 text-amber-700",
  quoted: "bg-purple-100 text-purple-700",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  completed: "bg-emerald-100 text-emerald-700",
}

const statusLabels = {
  new: "New", contacted: "Contacted", quoted: "Offer Sent",
  accepted: "Accepted", rejected: "Rejected", completed: "Completed",
}

export default async function DashboardPage() {
  const stats = await getLeadsStats()

  return (
    <div className="p-8">

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of Scraply Auto leads</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm col-span-2 lg:col-span-1">
          <p className="text-sm text-gray-500 font-medium">Total Leads</p>
          <p className="text-4xl font-black text-slate-900 mt-1">{stats.total}</p>
        </div>
        {stats.byStatus.map((s) => (
          <div key={s.status} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 font-medium">
              {statusLabels[s.status] || s.status}
            </p>
            <p className="text-3xl font-black text-slate-900 mt-1">{s.count}</p>
          </div>
        ))}
      </div>

      {/* Recent leads */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Recent Leads</h2>
          <Link href="/admin/leads" className="text-sm text-orange-500 hover:underline font-medium">
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Name</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Phone</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">City</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Vehicle</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recent.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">
                    <Link href={`/admin/leads/${lead.id}`} className="hover:text-orange-500">
                      {lead.first_name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{lead.phone}</td>
                  <td className="px-6 py-4 text-gray-600">{lead.city}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {lead.vehicle_year} {lead.vehicle_make} {lead.vehicle_model}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[lead.status] || "bg-gray-100 text-gray-700"}`}>
                      {statusLabels[lead.status] || lead.status}
                    </span>
                  </td>
                </tr>
              ))}
              {stats.recent.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                    No leads yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
