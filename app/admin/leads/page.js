import { getAllLeads } from "@/lib/queries/leads"
import Link from "next/link"
import { Phone, Mail } from "lucide-react"

export const metadata = { title: "Leads" }

const statusColors = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-amber-100 text-amber-700",
  quoted: "bg-purple-100 text-purple-700",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  completed: "bg-emerald-100 text-emerald-700",
}

const rowBg = {
  new: "border-l-blue-400 hover:bg-blue-50/20",
  contacted: "border-l-amber-400 hover:bg-amber-50/20",
  quoted: "border-l-purple-400 hover:bg-purple-50/20",
  accepted: "border-l-green-400 hover:bg-green-50/20",
  rejected: "border-l-red-300 hover:bg-red-50/10",
  completed: "border-l-emerald-400 hover:bg-emerald-50/20",
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

const filterActiveClass = {
  "": "bg-slate-900 text-white border-slate-900",
  new: "bg-blue-600 text-white border-blue-600",
  contacted: "bg-amber-500 text-white border-amber-500",
  quoted: "bg-purple-600 text-white border-purple-600",
  accepted: "bg-green-600 text-white border-green-600",
  completed: "bg-emerald-600 text-white border-emerald-600",
  rejected: "bg-red-500 text-white border-red-500",
}

function getInitials(firstName, lastName) {
  return [firstName?.[0], lastName?.[0]].filter(Boolean).join("").toUpperCase() || "?"
}

const avatarColors = [
  "bg-orange-100 text-orange-600",
  "bg-blue-100 text-blue-600",
  "bg-purple-100 text-purple-600",
  "bg-green-100 text-green-600",
  "bg-pink-100 text-pink-600",
  "bg-teal-100 text-teal-600",
]

export default async function LeadsPage({ searchParams }) {
  const { status } = await searchParams
  const leads = await getAllLeads({ status: status || undefined, limit: 100 })

  return (
    <div className="p-4 lg:p-8">

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
          <p className="text-gray-500 text-sm mt-1">
            {leads.length} lead{leads.length !== 1 ? "s" : ""}
            {status ? ` · filter: ${statusLabels[status] || status}` : " total"}
          </p>
        </div>
        <a
          href="/api/admin/leads/export"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 hover:border-gray-400 text-sm font-medium text-gray-700 transition-colors shadow-sm"
        >
          ↓ Export CSV
        </a>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterOptions.map((opt) => {
          const isActive = (status || "") === opt.value
          return (
            <Link
              key={opt.value}
              href={opt.value ? `/admin/leads?status=${opt.value}` : "/admin/leads"}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                isActive
                  ? (filterActiveClass[opt.value] || "bg-slate-900 text-white border-slate-900")
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {opt.label}
            </Link>
          )
        })}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 lg:px-6 py-3 text-gray-500 font-medium hidden sm:table-cell">#</th>
                <th className="text-left px-4 lg:px-6 py-3 text-gray-500 font-medium">Customer</th>
                <th className="text-left px-4 lg:px-6 py-3 text-gray-500 font-medium hidden md:table-cell">Contact</th>
                <th className="text-left px-4 lg:px-6 py-3 text-gray-500 font-medium hidden lg:table-cell">City</th>
                <th className="text-left px-4 lg:px-6 py-3 text-gray-500 font-medium hidden lg:table-cell">Vehicle</th>
                <th className="text-left px-4 lg:px-6 py-3 text-gray-500 font-medium">Status</th>
                <th className="text-left px-4 lg:px-6 py-3 text-gray-500 font-medium hidden sm:table-cell">Date</th>
                <th className="px-4 lg:px-6 py-3" />
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, i) => {
                const initials = getInitials(lead.first_name, lead.last_name)
                const avatarColor = avatarColors[lead.id % avatarColors.length]
                const accentClass = rowBg[lead.status] || "border-l-gray-200 hover:bg-gray-50"

                return (
                  <tr
                    key={lead.id}
                    className={`border-b border-gray-50 border-l-4 ${accentClass} transition-colors`}
                  >
                    <td className="px-4 lg:px-6 py-4 text-gray-300 font-mono text-xs hidden sm:table-cell">{lead.id}</td>

                    <td className="px-4 lg:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${avatarColor}`}>
                          {initials}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">
                            {[lead.first_name, lead.last_name].filter(Boolean).join(" ")}
                          </p>
                          <p className="text-xs text-gray-400 md:hidden">{lead.phone}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 lg:px-6 py-4 hidden md:table-cell">
                      <div className="flex flex-col gap-1">
                        <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 text-green-600 hover:underline text-xs font-medium">
                          <Phone className="w-3 h-3" />
                          {lead.phone}
                        </a>
                        {lead.email && (
                          <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 text-blue-500 hover:underline text-xs">
                            <Mail className="w-3 h-3" />
                            {lead.email}
                          </a>
                        )}
                      </div>
                    </td>

                    <td className="px-4 lg:px-6 py-4 text-gray-600 text-sm hidden lg:table-cell">{lead.city || "—"}</td>

                    <td className="px-4 lg:px-6 py-4 text-gray-600 text-sm hidden lg:table-cell">
                      {[lead.vehicle_year, lead.vehicle_make, lead.vehicle_model].filter(Boolean).join(" ") || "—"}
                    </td>

                    <td className="px-4 lg:px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[lead.status] || "bg-gray-100 text-gray-700"}`}>
                        {statusLabels[lead.status] || lead.status}
                      </span>
                    </td>

                    <td className="px-4 lg:px-6 py-4 text-gray-400 text-xs whitespace-nowrap hidden sm:table-cell">
                      {new Date(lead.created_at).toLocaleDateString("en-CA")}
                    </td>

                    <td className="px-4 lg:px-6 py-4">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-orange-500 text-white text-xs font-semibold transition-colors whitespace-nowrap"
                      >
                        Details →
                      </Link>
                    </td>
                  </tr>
                )
              })}

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
