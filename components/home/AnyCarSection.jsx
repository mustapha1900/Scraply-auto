"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
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

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-orange-500/10 rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/JunkCar2.jpg"
                alt="We buy junk cars in any condition"
                width={700}
                height={500}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="inline-block bg-orange-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                  We buy cars like this — no questions asked
                </span>
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
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 h-13 font-semibold shadow-lg shadow-orange-500/20"
                nativeButton={false} render={<Link href="/#quote" />}
              >
                Get My Free Cash Offer →
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
