"use client"

import { useState } from "react"
import { ChevronDown, Phone } from "lucide-react"
import Footer from "@/components/layout/Footer"
import Link from "next/link"

const faqs = [
  {
    category: "Getting a Quote",
    items: [
      {
        q: "How do I get a quote for my junk car?",
        a: "Simply fill out our quick online form or call us at (647) 555-0100. We'll ask for basic info about your vehicle — year, make, model, condition — and call you back within 24 hours with a real cash offer.",
      },
      {
        q: "Is the quote really free and no-obligation?",
        a: "100%. Getting a quote costs you nothing and you're never pressured to accept. We give you a fair offer and the decision is entirely yours.",
      },
      {
        q: "How is the offer price determined?",
        a: "We factor in the year, make, model, mileage, condition, and current scrap metal market values. We compare multiple data points to make sure you get the highest possible offer.",
      },
      {
        q: "Can I negotiate the offer?",
        a: "Absolutely. If you have a competing offer or feel the price should be higher, let us know. We'll do our best to match or beat it.",
      },
    ],
  },
  {
    category: "Pickup & Towing",
    items: [
      {
        q: "Is towing really free?",
        a: "Yes — 100% free towing anywhere in Ottawa, Gatineau, and surrounding areas within about 100 km. No hidden fees, no deductions from your payout.",
      },
      {
        q: "How fast can you pick up my car?",
        a: "In most cases, same-day or next-day pickup. Once you accept our offer, we schedule a tow truck at a time that works for you — including weekends.",
      },
      {
        q: "Do I need to be home for the pickup?",
        a: "Yes, someone needs to be present to hand over the keys and sign the paperwork. The whole process takes about 15–20 minutes.",
      },
      {
        q: "What if my car is not on the driveway — it's in a tight spot or a garage?",
        a: "Not a problem. Our tow truck operators are experienced with difficult retrieval situations. Just let us know the details when you book.",
      },
    ],
  },
  {
    category: "Vehicle Eligibility",
    items: [
      {
        q: "What kind of vehicles do you buy?",
        a: "We buy all types — cars, SUVs, trucks, vans, and minivans. Any make, any model, any year. Running or not, damaged, flooded, missing parts — we take it all.",
      },
      {
        q: "My car doesn't run at all. Do you still take it?",
        a: "Yes. In fact, most of the vehicles we buy are non-runners. That's kind of our specialty.",
      },
      {
        q: "Do you buy cars that have been in accidents?",
        a: "Absolutely. Accident-damaged, totalled, airbags deployed — we buy them regardless of the damage level.",
      },
      {
        q: "Do you buy old classic cars or antiques?",
        a: "Yes. If you have an old vehicle you want to get rid of, we'll make you an offer. Give us a call and describe the vehicle.",
      },
    ],
  },
  {
    category: "Paperwork & Payment",
    items: [
      {
        q: "What documents do I need to sell my car?",
        a: "Ideally you'll have the vehicle ownership (title) in your name. If you don't have it, call us — we handle many title-less transactions and can guide you through the process.",
      },
      {
        q: "What if the car is not in my name?",
        a: "Give us a call and explain the situation. We handle estate cases, gifted vehicles, and other non-standard scenarios regularly.",
      },
      {
        q: "How do I get paid?",
        a: "Cash on pickup — when the tow truck arrives, you get paid on the spot before the vehicle leaves. We also offer e-transfer if you prefer.",
      },
      {
        q: "Are there any hidden fees?",
        a: "None. The price we quote is the price you get. Towing is included. No admin fees, no fuel surcharges, no deductions.",
      },
    ],
  },
  {
    category: "Service Area",
    items: [
      {
        q: "What areas do you serve?",
        a: "We serve Ottawa, Gatineau, Kanata, Barrhaven, Orleans, Nepean, Rockland, Carleton Place, Kemptville, Smiths Falls, Arnprior, Perth, Hawkesbury, and all surrounding communities within about 100 km of Ottawa.",
      },
      {
        q: "Do you serve the Quebec side (Gatineau)?",
        a: "Yes — we cross the river at no extra charge. Hull, Aylmer, Buckingham, Masson-Angers — all covered.",
      },
      {
        q: "I'm outside Ottawa but nearby — do you still come?",
        a: "Probably yes. Call or fill out the form and let us know your location. We cover a wide area and may still be able to help.",
      },
    ],
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
      >
        <span className="text-sm font-semibold text-slate-900 leading-snug">{q}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 mt-0.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <p className="text-sm text-gray-600 leading-relaxed pb-5">{a}</p>
      )}
    </div>
  )
}

export default function FAQPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-4">FAQ</p>
          <h1 className="text-4xl lg:text-5xl font-black">Frequently Asked Questions</h1>
          <p className="mt-5 text-slate-300 text-lg max-w-xl mx-auto">
            Everything you need to know about selling your junk car in Ottawa &amp; Gatineau.
          </p>
        </div>
      </section>

      {/* FAQ content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 space-y-10">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-4">
                {section.category}
              </h2>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6">
                {section.items.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-16 bg-orange-500 text-white text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="text-2xl font-black mb-3">Still Have Questions?</h2>
          <p className="text-orange-100 mb-8">
            Call us directly — we&apos;re available 7 days a week and happy to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+16475550100"
              className="inline-flex items-center gap-2 bg-white text-orange-500 hover:bg-orange-50 font-bold px-8 h-12 rounded-full transition-colors"
            >
              <Phone className="w-4 h-4" />
              (647) 555-0100
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/40 text-white hover:bg-white/10 font-semibold px-8 h-12 rounded-full transition-colors"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
