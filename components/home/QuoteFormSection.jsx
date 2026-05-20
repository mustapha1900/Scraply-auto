"use client"

import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, Loader2, Camera, X } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

const MAKES = [
  "Acura", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler",
  "Dodge", "Ford", "GMC", "Honda", "Hyundai", "Infiniti", "Jeep", "Kia",
  "Land Rover", "Lexus", "Lincoln", "Mazda", "Mercedes-Benz", "Mercury",
  "MINI", "Mitsubishi", "Nissan", "Oldsmobile", "Pontiac", "Porsche",
  "Ram", "Saturn", "Scion", "Subaru", "Suzuki", "Tesla", "Toyota",
  "Volkswagen", "Volvo", "Other",
]

const years = Array.from({ length: 46 }, (_, i) => 2026 - i)
const conditions = ["Good", "Fair", "Poor", "Damaged — Not Drivable", "Parts Only"]
const cities = [
  "Ottawa",
  "Gatineau",
  "Kanata",
  "Orleans",
  "Barrhaven",
  "Nepean",
  "Rockland",
  "Embrun",
  "Carleton Place",
  "Kemptville",
  "Smiths Falls",
  "Almonte",
  "Arnprior",
  "Perth",
  "Renfrew",
  "Hawkesbury",
  "Other",
]

const benefits = [
  "Free towing in Ottawa, Gatineau & surrounding areas",
  "Same-day or next-day pickup available",
  "Cash payment on pickup — no waiting",
  "We buy any make, model, or year",
  "No title? We can help sort it out",
  "Fully licensed auto recycler",
]

const selectClass =
  "w-full h-10 px-3 rounded-md border border-input text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-colors"

export default function QuoteFormSection() {
  const [status, setStatus] = useState("idle")
  const [photos, setPhotos] = useState([])
  const [previews, setPreviews] = useState([])
  const [models, setModels] = useState([])
  const [loadingModels, setLoadingModels] = useState(false)
  const fileInputRef = useRef(null)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm()

  const selectedYear = watch("year")
  const selectedMake = watch("make")
  const selectedModel = watch("model")

  // Fetch models when year + make are both selected
  useEffect(() => {
    if (!selectedYear || !selectedMake || selectedMake === "Other") {
      setModels([])
      return
    }
    setValue("model", "")
    setValue("trim", "")
    setLoadingModels(true)
    fetch(`/api/vehicles?cmd=getModels&year=${selectedYear}&make=${encodeURIComponent(selectedMake)}`)
      .then((res) => res.json())
      .then((data) => setModels(data.models || []))
      .catch(() => setModels([]))
      .finally(() => setLoadingModels(false))
  }, [selectedYear, selectedMake])


  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4)
    setPhotos(files)
    setPreviews(files.map((f) => URL.createObjectURL(f)))
  }

  const removePhoto = (index) => {
    const newPhotos = photos.filter((_, i) => i !== index)
    const newPreviews = previews.filter((_, i) => i !== index)
    URL.revokeObjectURL(previews[index])
    setPhotos(newPhotos)
    setPreviews(newPreviews)
  }

  const onSubmit = async (data) => {
    setStatus("loading")
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Server error")
      const { id } = await res.json()

      if (photos.length > 0 && id) {
        const formData = new FormData()
        formData.append("lead_id", id)
        photos.forEach((photo) => formData.append("photos", photo))
        await fetch("/api/upload", { method: "POST", body: formData })
      }

      setStatus("success")
      reset()
      setPhotos([])
      setPreviews([])
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <section className="py-20 bg-gray-50" id="quote">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-12 shadow-sm border"
          >
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-3">We got your request!</h2>
            <p className="text-gray-500 text-lg">
              Our team will call you within 24 hours with your free cash offer.
            </p>
            <Button
              className="mt-8 bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8"
              onClick={() => setStatus("idle")}
            >
              Submit Another Vehicle
            </Button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-slate-50" id="quote">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-12">
          <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-3">Free &amp; No Obligation</p>
          <h2 className="text-4xl font-bold text-slate-900">Get Your Free Quote</h2>
          <p className="text-gray-500 text-lg mt-3 max-w-xl mx-auto">
            Fill in your vehicle details and we&apos;ll call you back within 24 hours with a real cash offer.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">

          {/* Form card */}
          <div className="lg:col-span-3 bg-white rounded-3xl shadow-md border border-orange-100 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-5">
              <h3 className="text-white font-bold text-lg">Tell us about your vehicle</h3>
              <p className="text-orange-100 text-sm mt-0.5">Takes less than 2 minutes · 100% free</p>
            </div>
            <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              {/* Row: First Name + Last Name + Phone */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    First Name <span className="text-orange-500">*</span>
                  </label>
                  <Input
                    placeholder="John"
                    {...register("firstName", { required: "Required" })}
                    className={errors.firstName ? "border-red-400" : ""}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Last Name <span className="text-orange-500">*</span>
                  </label>
                  <Input
                    placeholder="Smith"
                    {...register("lastName", { required: "Required" })}
                    className={errors.lastName ? "border-red-400" : ""}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Phone <span className="text-orange-500">*</span>
                  </label>
                  <Input
                    placeholder="(647) 555-0100"
                    type="tel"
                    {...register("phone", {
                      required: "Required",
                      pattern: {
                        value: /^[\d\s\-().+]{7,15}$/,
                        message: "Invalid phone number",
                      },
                    })}
                    className={errors.phone ? "border-red-400" : ""}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Row: Email + City */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email</label>
                  <Input
                    placeholder="john@email.com"
                    type="email"
                    {...register("email", {
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email",
                      },
                    })}
                    className={errors.email ? "border-red-400" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    City <span className="text-orange-500">*</span>
                  </label>
                  <select
                    {...register("city", { required: "Required" })}
                    className={`${selectClass} ${errors.city ? "border-red-400" : ""}`}
                  >
                    <option value="">Select your city...</option>
                    {cities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                  )}
                </div>
              </div>

              {/* Row 1: Year + Make */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Year <span className="text-orange-500">*</span>
                  </label>
                  <select
                    {...register("year", { required: "Required" })}
                    className={`${selectClass} ${errors.year ? "border-red-400" : ""}`}
                  >
                    <option value="">Select year...</option>
                    {years.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                  {errors.year && (
                    <p className="text-red-500 text-xs mt-1">{errors.year.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Make <span className="text-orange-500">*</span>
                  </label>
                  <select
                    {...register("make", { required: "Required" })}
                    disabled={!selectedYear}
                    className={`${selectClass} ${errors.make ? "border-red-400" : ""} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <option value="">{!selectedYear ? "Select year first" : "Select make..."}</option>
                    {MAKES.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  {errors.make && (
                    <p className="text-red-500 text-xs mt-1">{errors.make.message}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Model + Trim */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Model <span className="text-orange-500">*</span>
                  </label>
                  {selectedMake === "Other" || (selectedMake && selectedYear && !loadingModels && models.length === 0) ? (
                    <Input
                      placeholder="Enter model"
                      {...register("model", { required: "Required" })}
                      className={errors.model ? "border-red-400" : ""}
                    />
                  ) : (
                    <select
                      {...register("model", { required: "Required" })}
                      disabled={!selectedMake || !selectedYear || loadingModels}
                      className={`${selectClass} ${errors.model ? "border-red-400" : ""} disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <option value="">
                        {!selectedMake || !selectedYear
                          ? "Select year & make first"
                          : loadingModels
                          ? "Loading models..."
                          : "Select model..."}
                      </option>
                      {models.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  )}
                  {errors.model && (
                    <p className="text-red-500 text-xs mt-1">{errors.model.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Trim <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <Input
                    placeholder="e.g. LX, EX, Sport, Touring"
                    {...register("trim")}
                    disabled={!selectedModel}
                    className="disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Row: Mileage + Condition */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Mileage</label>
                  <Input
                    placeholder="150,000 km"
                    {...register("mileage")}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Condition <span className="text-orange-500">*</span>
                  </label>
                  <select
                    {...register("condition", { required: "Required" })}
                    className={`${selectClass} ${errors.condition ? "border-red-400" : ""}`}
                  >
                    <option value="">Select condition...</option>
                    {conditions.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.condition && (
                    <p className="text-red-500 text-xs mt-1">{errors.condition.message}</p>
                  )}
                </div>
              </div>

              {/* Running? */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Is the vehicle running? <span className="text-orange-500">*</span>
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="yes"
                      {...register("isRunning", { required: true })}
                      className="accent-orange-500 w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">Yes, it runs</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="no"
                      {...register("isRunning", { required: true })}
                      className="accent-orange-500 w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">No, not running</span>
                  </label>
                </div>
                {errors.isRunning && (
                  <p className="text-red-500 text-xs mt-1">Please select one</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Additional Notes
                </label>
                <Textarea
                  placeholder="Any other details about your vehicle (damage, missing parts, location, etc.)"
                  rows={3}
                  {...register("message")}
                />
              </div>

              {/* Photo upload */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Vehicle Photos <span className="text-gray-400 font-normal">(optional, up to 4)</span>
                </label>

                {previews.length > 0 ? (
                  <div className="grid grid-cols-4 gap-2 mb-2">
                    {previews.map((src, i) => (
                      <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                        <Image src={src} alt={`Photo ${i + 1}`} fill className="object-cover" />
                        <button
                          type="button"
                          onClick={() => removePhoto(i)}
                          className="absolute top-1 right-1 w-5 h-5 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    {previews.length < 4 && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 hover:border-orange-400 hover:text-orange-400 transition-colors"
                      >
                        <Camera className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center gap-2 text-gray-400 hover:border-orange-400 hover:text-orange-400 transition-colors"
                  >
                    <Camera className="w-7 h-7" />
                    <span className="text-sm font-medium">Add photos of your vehicle</span>
                    <span className="text-xs">JPG, PNG — max 4 photos</span>
                  </button>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {status === "error" && (
                <p className="text-red-600 text-sm bg-red-50 border border-red-100 p-3 rounded-lg">
                  Something went wrong. Please try again or call us at (647) 555-0100.
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={status === "loading"}
                className="w-full h-14 text-base font-semibold rounded-xl bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Getting Your Quote...
                  </>
                ) : (
                  "Get My Free Quote →"
                )}
              </Button>

              <p className="text-xs text-gray-400 text-center">
                No spam. We only contact you about your vehicle.
              </p>

            </form>
            </div>{/* end p-8 */}
          </div>

          {/* Benefits sidebar */}
          <div className="lg:col-span-2 space-y-6 lg:sticky lg:top-24">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Why Scraply Auto?</h3>
              <p className="text-gray-500">
                We make selling your junk car simple, fast, and stress-free.
              </p>
            </div>

            <ul className="space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                  <span className="text-gray-700 text-sm">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
              <p className="font-semibold text-slate-900 text-sm">Prefer to call?</p>
              <a
                href="tel:+16475550100"
                className="text-2xl font-black text-orange-500 hover:text-orange-600 block mt-1 transition-colors"
              >
                (647) 555-0100
              </a>
              <p className="text-xs text-gray-500 mt-1">Mon–Sun · 7am–9pm EST</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
