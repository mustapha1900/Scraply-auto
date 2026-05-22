import { getLeadsStats } from "@/lib/queries/leads"
import Link from "next/link"
import { Users, Clock, CheckCircle, TrendingUp } from "lucide-react"

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

const rowAccent = {
  new: "border-l-blue-400",
  contacted: "border-l-amber-400",
  quoted: "border-l-purple-400",
  accepted: "border-l-green-400",
  rejected: "border-l-red-300",
  completed: "border-l-emerald-400",
}

export default async function DashboardPage() {
  const stats = await getLeadsStats()

  const byStatusMap = Object.fromEntries(stats.byStatus.map((s) => [s.status, s.count]))
  const newCount = byStatusMap.new || 0
  const activeCount = (byStatusMap.contacted || 0) + (byStatusMap.quoted || 0)
  const completedCount = byStatusMap.completed || 0

  return (
    <div className="p-4 lg:p-8">

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Real-time overview — Scraply Auto</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg shadow-orange-100 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-3">
            <p className="text-orange-100 text-sm font-medium">Total Leads</p>
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-5xl font-black">{stats.total}</p>
          <p className="text-orange-200 text-xs mt-2">All quote requests received</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-blue-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-500 text-sm font-medium">New</p>
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-blue-500" />
            </div>
          </div>
          <p className="text-5xl font-black text-blue-600">{newCount}</p>
          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium mt-2 inline-block">
            To contact
          </span>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-amber-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-500 text-sm font-medium">Active</p>
            <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center">
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
          </div>
          <p className="text-5xl font-black text-amber-500">{activeCount}</p>
          <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-medium mt-2 inline-block">
            Contacted + Quoted
          </span>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-emerald-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-500 text-sm font-medium">Completed</p>
            <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
          <p className="text-5xl font-black text-emerald-600">{completedCount}</p>
          <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-medium mt-2 inline-block">
            Cars purchased
          </span>
        </div>

      </div>

      {/* Status breakdown */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="font-semibold text-slate-900 mb-4">Breakdown by status</h2>
        <div className="flex flex-wrap gap-3">
          {stats.byStatus.length === 0 && (
            <p className="text-sm text-gray-400">No data yet</p>
          )}
          {stats.byStatus.map((s) => (
            <Link
              key={s.status}
              href={`/admin/leads?status=${s.status}`}
              className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 rounded-xl px-4 py-3 transition-colors group"
            >
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[s.status] || "bg-gray-100 text-gray-700"}`}>
                {statusLabels[s.status] || s.status}
              </span>
              <span className="text-2xl font-black text-slate-900">{s.count}</span>
              <span className="text-xs text-gray-400 group-hover:text-orange-500 transition-colors">→</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent leads */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Latest 5 leads</h2>
          <Link href="/admin/leads" className="text-sm text-orange-500 hover:underline font-medium">
            Voir tous →
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {stats.recent.map((lead) => (
            <div
              key={lead.id}
              className={`flex items-center gap-4 px-6 py-4 hover:bg-orange-50/30 border-l-4 ${rowAccent[lead.status] || "border-l-gray-200"} transition-colors`}
            >
              <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold shrink-0">
                {lead.first_name?.[0]?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm truncate">{lead.first_name}</p>
                <p className="text-xs text-gray-400 truncate">
                  {lead.city} · {[lead.vehicle_year, lead.vehicle_make, lead.vehicle_model].filter(Boolean).join(" ") || "Vehicle not specified"}
                </p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${statusColors[lead.status] || "bg-gray-100 text-gray-700"}`}>
                {statusLabels[lead.status] || lead.status}
              </span>
              <Link
                href={`/admin/leads/${lead.id}`}
                className="text-gray-300 hover:text-orange-500 shrink-0 transition-colors text-lg font-bold"
              >
                →
              </Link>
            </div>
          ))}
          {stats.recent.length === 0 && (
            <div className="px-6 py-12 text-center text-gray-400 text-sm">
              No leads yet
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
