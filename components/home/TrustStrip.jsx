import { ShieldCheck, Truck, Banknote, Clock, Star, Recycle } from "lucide-react"

const items = [
  { icon: ShieldCheck, text: "Licensed Auto Recycler" },
  { icon: Truck,       text: "Free Towing Included" },
  { icon: Banknote,    text: "Cash on Pickup" },
  { icon: Clock,       text: "Same-Day Available" },
  { icon: Star,        text: "4.9★ Google Rating" },
  { icon: Recycle,     text: "Eco-Friendly Disposal" },
]

export default function TrustStrip() {
  return (
    <section className="bg-slate-900 py-5 overflow-hidden">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-10 w-max"
          style={{ animation: "marquee 25s linear infinite" }}
        >
          {[...items, ...items].map(({ icon: Icon, text }, i) => (
            <span
              key={i}
              className="flex items-center gap-2.5 text-sm font-semibold text-slate-300 whitespace-nowrap"
            >
              <Icon className="w-4 h-4 text-orange-500 shrink-0" />
              {text}
              <span className="text-slate-600 ml-4">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
