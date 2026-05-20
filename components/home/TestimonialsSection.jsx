"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const reviews = [
  {
    name: "Marc D.",
    city: "Ottawa, ON",
    rating: 5,
    text: "Very smooth process from start to finish. Submitted the form in the evening, got a call the next morning, and the tow truck was there the same day. Got paid cash on the spot.",
    initials: "MD",
  },
  {
    name: "Sophie K.",
    city: "Gatineau, QC",
    rating: 5,
    text: "I wasn't sure anyone would take my car — it hadn't moved in two years. Scraply Auto came out to Gatineau with no issues and paid fairly. Would definitely use again.",
    initials: "SK",
  },
  {
    name: "Ahmed R.",
    city: "Kanata, ON",
    rating: 5,
    text: "Honestly the easiest transaction I've ever had. No back and forth, no games. The offer was fair, the pickup was fast, and the guys were professional.",
    initials: "AR",
  },
  {
    name: "Jennifer L.",
    city: "Barrhaven, ON",
    rating: 5,
    text: "I had no title for the car and was stressed about it, but they walked me through the whole thing over the phone. Very patient and helpful. Got it sorted with no problem.",
    initials: "JL",
  },
]

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-orange-50/30 to-white">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-3">
            Reviews
          </p>
          <h2 className="text-4xl font-bold text-slate-900">What Our Customers Say</h2>

          {/* Google badge */}
          <div className="flex items-center justify-center mt-5">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Google G */}
              <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <StarRating rating={5} />
                  <span className="text-sm font-bold text-slate-900 ml-0.5">4.9</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">200+ reviews on Google</p>
              </div>
            </a>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-orange-200 hover:shadow-md flex flex-col gap-4 transition-all"
            >
              <StarRating rating={review.rating} />
              <p className="text-gray-700 text-sm leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
                <div className="w-9 h-9 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                  {review.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{review.name}</p>
                  <p className="text-xs text-gray-400">{review.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
