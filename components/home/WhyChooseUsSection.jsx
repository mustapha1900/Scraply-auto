"use client"

import { motion } from "framer-motion"
import { Truck, Zap, DollarSign, ShieldCheck } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Free Towing Anywhere",
    description:
      "We tow your vehicle from anywhere in the Ottawa, Gatineau &amp; surrounding region at absolutely no cost to you.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Zap,
    title: "Same-Day Pickup",
    description:
      "Accept our offer and in most cases we can dispatch a tow truck the very same day — even on weekends.",
    color: "bg-orange-50 text-orange-500",
  },
  {
    icon: DollarSign,
    title: "Best Cash Offers",
    description:
      "We compare real market values to make sure you receive the highest possible cash offer for your vehicle.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: ShieldCheck,
    title: "Licensed & Trusted",
    description:
      "Scraply Auto is a fully licensed auto recycler serving Ottawa &amp; Gatineau. Hundreds of happy customers — zero scams, zero games.",
    color: "bg-purple-50 text-purple-600",
  },
]

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Why Us
          </p>
          <h2 className="text-4xl font-bold">Why Choose Scraply Auto?</h2>
          <p className="text-slate-400 text-lg mt-3 max-w-xl mx-auto">
            Ottawa &amp; Gatineau&apos;s most trusted junk car buyer for a reason.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${feature.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
