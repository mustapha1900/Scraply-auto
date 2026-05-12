import { getAllLeads } from "@/lib/queries/leads"
import Link from "next/link"

export const metadata = { title: "Leads" }

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

const filterOptions = [
  { value: "", label: "All" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "quoted", label: "Offer Sent" },
  { value: "accepted", label: "Accepted" },
  { value: "completed", label: "Completed" },
  { value: "rejected", label: "Rejected" },
]

export default async function LeadsPage({ searchParams }) {
  const { status } = await searchParams
  const leads = await getAllLeads({ status: status || undefined, limit: 100 })

  return (
    <div className="p-8">

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
          <p className="text-gray-500 text-sm mt-1">
            {leads.length} lead{leads.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterOptions.map((opt) => (
          <Link
            key={opt.value}
            href={opt.value ? `/admin/leads?status=${opt.value}` : "/admin/leads"}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              (status || "") === opt.value
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
            }`}
          >
            {opt.label}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-3 text-gray-500 font-medium">#</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Name</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Phone</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">City</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Vehicle</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Status</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Date</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors">
                  <td className="px-6 py-4 text-gray-400 font-mono text-xs">{lead.id}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{lead.first_name}</td>
                  <td className="px-6 py-4 text-gray-600">{lead.phone}</td>
                  <td className="px-6 py-4 text-gray-600">{lead.city}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {[lead.vehicle_year, lead.vehicle_make, lead.vehicle_model].filter(Boolean).join(" ") || "—"}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[lead.status] || "bg-gray-100 text-gray-700"}`}>
                      {statusLabels[lead.status] || lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">
                    {new Date(lead.created_at).toLocaleDateString("en-CA")}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-orange-500 text-white text-xs font-semibold transition-colors"
                    >
                      See Details →
                    </Link>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center text-gray-400">
                    No leads in this category
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
