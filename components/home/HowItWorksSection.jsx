"use client"

import { motion } from "framer-motion"
import { ClipboardList, MessageSquareDot, Truck, Banknote } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Submit Your Info",
    description:
      "Fill out our quick 60-second form with basic details about your vehicle. No paperwork needed upfront.",
  },
  {
    number: "02",
    icon: MessageSquareDot,
    title: "Receive Your Offer",
    description:
      "Our team reviews your submission and calls you back within 30 minutes with a real, no-obligation cash offer.",
  },
  {
    number: "03",
    icon: Truck,
    title: "Free Pickup",
    description:
      "Accept the offer and we dispatch a tow truck to your location at no charge — Ottawa, Gatineau &amp; surrounding areas.",
  },
  {
    number: "04",
    icon: Banknote,
    title: "Get Paid Cash",
    description:
      "Hand over the keys when we arrive and get paid on the spot. Fast, secure, and completely hassle-free.",
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-3">
            Simple Process
          </p>
          <h2 className="text-4xl font-bold text-slate-900">How It Works</h2>
          <p className="text-gray-500 text-lg mt-3 max-w-xl mx-auto">
            From quote to cash in as little as a few hours.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+2.5rem)] right-0 h-px bg-gray-200 -translate-y-0.5" />
                )}

                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-5">
                    <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center">
                      <Icon className="w-9 h-9 text-orange-500" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                </div>

              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
