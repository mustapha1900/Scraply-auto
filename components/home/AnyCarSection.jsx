"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

const points = [
  "Running or not running",
  "Accident-damaged or totalled",
  "Rusted, dented, or flooded",
  "Missing parts or engine problems",
  "Any make, model, and year",
  "No title? We can help sort it out",
]

export default function AnyCarSection() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Photos */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative pb-10"
          >
            <div className="absolute -inset-4 bg-orange-500/10 rounded-3xl blur-2xl" />

            {/* Main photo */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/tucson_junk.jpg"
                alt="Hyundai Tucson — junk car pickup Ottawa"
                width={700}
                height={480}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                  Recently purchased · Ottawa
                </span>
              </div>
            </div>

            {/* Secondary photo — overlapping bottom right */}
            <div className="absolute -bottom-2 right-4 w-44 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/assets/Rav4_junk.jpg"
                alt="Toyota RAV4 — junk car Ottawa"
                width={200}
                height={140}
                className="w-full h-32 object-cover"
              />
              <div className="bg-white px-3 py-1.5">
                <p className="text-xs font-semibold text-slate-700">Toyota RAV4</p>
                <p className="text-xs text-gray-400">Gatineau pickup</p>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-3">
              No Judgment, No Hassle
            </p>
            <h2 className="text-4xl font-black text-slate-900 leading-tight">
              We Buy Any Car,{" "}
              <span className="text-orange-500">Any Condition</span>
            </h2>
            <p className="mt-4 text-gray-500 text-lg leading-relaxed">
              Don&apos;t let your old car sit and rust. Whether it&apos;s completely wrecked,
              missing parts, or hasn&apos;t moved in years — we&apos;ll make you a fair cash
              offer and tow it away for free.
            </p>

            <ul className="mt-8 space-y-3">
              {points.map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                  <span className="text-gray-700 font-medium">{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Link
                href="/#quote"
                className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white text-base px-8 h-13 rounded-full font-semibold shadow-lg shadow-orange-500/20 transition-colors"
              >
                Get My Free Cash Offer →
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
