"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Check } from "lucide-react"

const statuses = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "quoted", label: "Offer Sent" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
  { value: "completed", label: "Completed" },
]

const selectClass = "w-full h-10 px-3 rounded-lg border border-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"

export default function LeadActions({ leadId, currentStatus, currentNotes }) {
  const router = useRouter()
  const [status, setStatus] = useState(currentStatus)
  const [notes, setNotes] = useState(currentNotes || "")
  const [statusLoading, setStatusLoading] = useState(false)
  const [notesLoading, setNotesLoading] = useState(false)
  const [statusSaved, setStatusSaved] = useState(false)
  const [notesSaved, setNotesSaved] = useState(false)

  const saveStatus = async () => {
    setStatusLoading(true)
    await fetch(`/api/admin/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    setStatusLoading(false)
    setStatusSaved(true)
    setTimeout(() => setStatusSaved(false), 2000)
    router.refresh()
  }

  const saveNotes = async () => {
    setNotesLoading(true)
    await fetch(`/api/admin/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes }),
    })
    setNotesLoading(false)
    setNotesSaved(true)
    setTimeout(() => setNotesSaved(false), 2000)
  }

  return (
    <div className="space-y-6">

      {/* Status */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Lead Status</h3>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={selectClass}
        >
          {statuses.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
        <Button
          onClick={saveStatus}
          disabled={statusLoading || status === currentStatus}
          className="mt-3 w-full bg-slate-900 hover:bg-slate-700 text-white"
        >
          {statusLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : statusSaved ? (
            <><Check className="w-4 h-4 mr-1" /> Saved</>
          ) : (
            "Update Status"
          )}
        </Button>
      </div>

      {/* Internal notes */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Internal Notes</h3>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add internal notes about this lead..."
          rows={5}
        />
        <Button
          onClick={saveNotes}
          disabled={notesLoading}
          className="mt-3 w-full bg-slate-900 hover:bg-slate-700 text-white"
        >
          {notesLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : notesSaved ? (
            <><Check className="w-4 h-4 mr-1" /> Saved</>
          ) : (
            "Save Notes"
          )}
        </Button>
      </div>

    </div>
  )
}
