"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const reviews = [
  {
    name: "Marc D.",
    city: "Ottawa, ON",
    rating: 5,
    text: "Scraply Auto gave me $900 for my 2008 Civic that wouldn't start. They came the next morning and I had cash in hand by noon. Couldn't be easier.",
    initials: "MD",
  },
  {
    name: "Sophie K.",
    city: "Gatineau, QC",
    rating: 5,
    text: "Meilleur service pour vendre une vieille voiture. No haggling, no games. The price they quoted over the phone was exactly what I got on pickup day.",
    initials: "SK",
  },
  {
    name: "Ahmed R.",
    city: "Kanata, ON",
    rating: 5,
    text: "Called at 9am, tow truck was there by 2pm, and I was paid same day. These guys are legit. Already recommended them to two friends in Barrhaven.",
    initials: "AR",
  },
  {
    name: "Jennifer L.",
    city: "Barrhaven, ON",
    rating: 5,
    text: "I was worried because my car had no title but they helped me sort everything out over the phone. Super professional and fair price.",
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
    <section className="py-20 bg-white">
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
          <div className="flex items-center justify-center gap-2 mt-4">
            <StarRating rating={5} />
            <span className="text-gray-500 text-sm font-medium">4.9 out of 5 · 200+ Google Reviews</span>
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
              className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col gap-4"
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
