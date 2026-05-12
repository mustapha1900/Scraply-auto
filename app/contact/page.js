"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Loader2, Phone, Mail, MapPin, Clock } from "lucide-react"
import Footer from "@/components/layout/Footer"

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "(647) 555-0100",
    href: "tel:+16475550100",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@scraplyauto.ca",
    href: "mailto:info@scraplyauto.ca",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: MapPin,
    label: "Service Area",
    value: "Ottawa, ON & Gatineau, QC",
    color: "bg-orange-50 text-orange-500",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon – Sun · 7am – 9pm EST",
    color: "bg-purple-50 text-purple-600",
  },
]

export default function ContactPage() {
  const [status, setStatus] = useState("idle")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setStatus("loading")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus("success")
      reset()
    } catch {
      setStatus("error")
    }
  }

  return (
    <main>
      {/* Hero */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-4">Contact</p>
          <h1 className="text-4xl lg:text-5xl font-black">Get in Touch</h1>
          <p className="mt-5 text-slate-300 text-lg max-w-xl mx-auto">
            Questions about selling your car? We&apos;re here to help — 7 days a week.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-10 items-start">

            {/* Contact info */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Contact Information</h2>
              {contactInfo.map(({ icon: Icon, label, value, href, color }) => (
                <div key={label} className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm font-semibold text-slate-900 hover:text-orange-500 transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-slate-900">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="bg-orange-500 rounded-2xl p-6 text-white mt-6">
                <p className="font-bold text-lg mb-1">Fastest way to get a quote?</p>
                <p className="text-orange-100 text-sm mb-4">
                  Call us directly — we respond within 30 minutes with a real cash offer.
                </p>
                <a
                  href="tel:+16475550100"
                  className="inline-flex items-center gap-2 bg-white text-orange-500 hover:bg-orange-50 font-bold px-6 h-11 rounded-full text-sm transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  (647) 555-0100
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              {status === "success" ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500">We&apos;ll get back to you as soon as possible.</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm text-orange-500 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <h2 className="text-xl font-bold text-slate-900 mb-2">Send Us a Message</h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                        Name <span className="text-orange-500">*</span>
                      </label>
                      <Input
                        placeholder="John Smith"
                        {...register("name", { required: "Required" })}
                        className={errors.name ? "border-red-400" : ""}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Phone</label>
                      <Input
                        placeholder="(647) 555-0100"
                        type="tel"
                        {...register("phone")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                      Email <span className="text-orange-500">*</span>
                    </label>
                    <Input
                      placeholder="john@email.com"
                      type="email"
                      {...register("email", {
                        required: "Required",
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
                      })}
                      className={errors.email ? "border-red-400" : ""}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                      Message <span className="text-orange-500">*</span>
                    </label>
                    <Textarea
                      placeholder="Tell us about your vehicle or ask us anything..."
                      rows={5}
                      {...register("message", { required: "Required" })}
                      className={errors.message ? "border-red-400" : ""}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  {status === "error" && (
                    <p className="text-red-600 text-sm bg-red-50 border border-red-100 p-3 rounded-lg">
                      Something went wrong. Please try again or call us directly.
                    </p>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "loading"}
                    className="w-full h-13 text-base font-semibold rounded-xl bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message →"
                    )}
                  </Button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
