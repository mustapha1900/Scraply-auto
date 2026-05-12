"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Phone } from "lucide-react"
import Image from "next/image"

const stats = [
  { value: "1,200+", label: "Cars Bought" },
  { value: "4.9★", label: "Google Rating" },
  { value: "< 1 hr", label: "Avg. Response" },
  { value: "50+", label: "Cities Served" },
]

const trustBadges = ["No hidden fees", "Same-day pickup", "Licensed recycler", "Free towing"]

export default function HeroSection() {
  const scrollToQuote = () => {
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(249,115,22,0.08),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — text */}
          <div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 text-orange-400 text-sm font-medium mb-8"
            >
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              Ottawa &amp; Gatineau&apos;s #1 Junk Car Buyer
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight"
            >
              Sell Your Junk Car —{" "}
              <span className="text-orange-500">Get Cash</span> Today
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-xl text-slate-300 leading-relaxed"
            >
              Free towing in Ottawa, Gatineau &amp; surrounding areas. Get a quote in 60 seconds —
              we buy any car, any condition, any year.
            </motion.p>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 flex flex-wrap gap-x-6 gap-y-2"
            >
              {trustBadges.map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-sm text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                  {item}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                onClick={scrollToQuote}
                className="bg-orange-500 hover:bg-orange-600 text-white text-base px-8 h-14 rounded-full font-semibold shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:-translate-y-0.5"
              >
                Get Instant Quote
              </Button>
              <a
                href="tel:+16475550100"
                className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 hover:border-white/60 text-base px-8 h-14 rounded-full font-semibold transition-all"
              >
                <Phone className="w-5 h-5" />
                (647) 555-0100
              </a>
            </motion.div>

          </div>

          {/* Right — illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              <div className="absolute -inset-6 bg-orange-500/20 rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/5">
                <Image
                  src="/assets/TowingCar_Animation.png"
                  alt="Free towing service — we pick up your junk car"
                  width={560}
                  height={380}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </motion.div>

        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 border-t border-white/10 pt-10"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl lg:text-4xl font-black text-white">{stat.value}</div>
              <div className="text-sm text-slate-400 mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
