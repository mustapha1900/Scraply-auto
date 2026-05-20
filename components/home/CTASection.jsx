import Link from "next/link"
import { Phone } from "lucide-react"

export default function CTASection() {
  return (
    <section className="py-20 bg-orange-500">
      <div className="max-w-4xl mx-auto px-6 text-center text-white">

        <h2 className="text-4xl lg:text-5xl font-black leading-tight">
          Ready to Get Rid of That Junk Car?
        </h2>
        <p className="mt-5 text-xl text-orange-100 max-w-xl mx-auto">
          Get your free, no-obligation offer in 60 seconds.
          Free towing included — Ottawa &amp; Gatineau region.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/#quote"
            className="inline-flex items-center bg-white text-orange-500 hover:bg-orange-50 text-base px-10 h-14 rounded-full font-bold shadow-lg transition-colors"
          >
            Get Free Quote Now
          </Link>
          <a
            href="tel:+16475550100"
            className="inline-flex items-center gap-2 border border-white/40 text-white hover:bg-white/10 hover:border-white/70 text-base px-8 h-14 rounded-full font-semibold transition-all"
          >
            <Phone className="w-5 h-5" />
            (647) 555-0100
          </a>
        </div>

        <p className="mt-6 text-sm text-orange-200">
          Available Mon–Sun · 7am–9pm EST · No obligation required
        </p>

      </div>
    </section>
  )
}
