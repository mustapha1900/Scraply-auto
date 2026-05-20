import { getLeadById, getLeadPhotos } from "@/lib/queries/leads"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import LeadActions from "@/components/admin/LeadActions"
import { ArrowLeft, Phone, Mail } from "lucide-react"

export async function generateMetadata({ params }) {
  const { id } = await params
  return { title: `Lead #${id}` }
}

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

function InfoRow({ label, value }) {
  if (!value) return null
  return (
    <div className="flex items-start gap-4 py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500 w-36 shrink-0">{label}</span>
      <span className="text-sm font-medium text-slate-900">{value}</span>
    </div>
  )
}

export default async function LeadDetailPage({ params }) {
  const { id } = await params
  const [lead, photos] = await Promise.all([getLeadById(id), getLeadPhotos(id)])

  if (!lead) notFound()

  return (
    <div className="p-8">

      <div className="mb-6">
        <Link href="/admin/leads" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to leads
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">{lead.first_name}</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[lead.status] || "bg-gray-100 text-gray-700"}`}>
                {statusLabels[lead.status] || lead.status}
              </span>
            </div>
            <p className="text-gray-400 text-sm mt-1">
              Lead #{lead.id} · Received on {new Date(lead.created_at).toLocaleDateString("en-CA", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>

          {/* Contact buttons */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${lead.phone}`}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4" />
              Call {lead.first_name}
            </a>
            {lead.email && (
              <a
                href={`mailto:${lead.email}?subject=Your Junk Car Quote — Scraply Auto`}
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
              >
                <Mail className="w-4 h-4" />
                Email {lead.first_name}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Lead info */}
        <div className="lg:col-span-2 space-y-6">

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-slate-900 mb-4">Contact Information</h2>
            <InfoRow label="Name" value={[lead.first_name, lead.last_name].filter(Boolean).join(" ")} />
            <div className="flex items-start gap-4 py-3 border-b border-gray-100">
              <span className="text-sm text-gray-500 w-36 shrink-0">Phone</span>
              <a href={`tel:${lead.phone}`} className="text-sm font-medium text-green-600 hover:underline">{lead.phone}</a>
            </div>
            {lead.email && (
              <div className="flex items-start gap-4 py-3 border-b border-gray-100">
                <span className="text-sm text-gray-500 w-36 shrink-0">Email</span>
                <a href={`mailto:${lead.email}`} className="text-sm font-medium text-blue-600 hover:underline">{lead.email}</a>
              </div>
            )}
            <InfoRow label="City" value={lead.city} />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-slate-900 mb-4">Vehicle Details</h2>
            <InfoRow label="Year" value={lead.vehicle_year?.toString()} />
            <InfoRow label="Make" value={lead.vehicle_make} />
            <InfoRow label="Model" value={lead.vehicle_model} />
            <InfoRow label="Trim" value={lead.vehicle_trim} />
            <InfoRow label="Mileage" value={lead.mileage} />
            <InfoRow label="Condition" value={lead.condition} />
            <InfoRow label="Running" value={lead.is_running === true ? "Yes" : lead.is_running === false ? "No" : null} />
          </div>

          {lead.message && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-semibold text-slate-900 mb-3">Customer Message</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{lead.message}</p>
            </div>
          )}

          {/* Photos */}
          {photos.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-semibold text-slate-900 mb-4">
                Vehicle Photos <span className="text-gray-400 font-normal text-sm">({photos.length})</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {photos.map((photo) => (
                  <a
                    key={photo.id}
                    href={photo.cloudinary_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative aspect-square rounded-xl overflow-hidden border border-gray-100 hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src={photo.cloudinary_url}
                      alt={photo.position}
                      fill
                      className="object-cover"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Actions */}
        <div className="lg:col-span-1">
          <LeadActions
            leadId={lead.id}
            currentStatus={lead.status}
            currentNotes={lead.internal_notes}
            currentOfferedPrice={lead.offered_price}
          />
        </div>

      </div>

    </div>
  )
}
