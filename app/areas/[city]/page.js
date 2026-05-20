import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, MapPin, Phone } from "lucide-react"
import Footer from "@/components/layout/Footer"


const cityData = {
  ottawa: {
    name: "Ottawa",
    province: "ON",
    neighborhoods: ["Kanata", "Barrhaven", "Orleans", "Nepean", "Gloucester", "Vanier", "Downtown"],
    description:
      "Scraply Auto serves all of Ottawa and its surrounding neighborhoods. Whether your vehicle broke down on Highway 417, has been sitting in your driveway for months, or simply isn't worth repairing, we're here to help. Free towing from anywhere in the National Capital Region.",
  },
  gatineau: {
    name: "Gatineau",
    province: "QC",
    neighborhoods: ["Hull", "Aylmer", "Buckingham", "Masson-Angers", "Gatineau sector"],
    description:
      "Scraply Auto serves all of Gatineau, including Hull, Aylmer, Buckingham, and Masson-Angers. We cross the river — if you're on the Quebec side, we'll come pick up your junk car at no extra charge.",
  },
  rockland: {
    name: "Rockland",
    province: "ON",
    neighborhoods: ["Clarence-Rockland", "Bourget", "Hammond", "Cheney", "Wendover"],
    description:
      "Scraply Auto offers junk car removal throughout the Rockland and Clarence-Rockland area, about 40 km east of Ottawa. Free towing, offer within 24 hours, cash paid on pickup.",
  },
  "carleton-place": {
    name: "Carleton Place",
    province: "ON",
    neighborhoods: ["Almonte", "Lanark", "Mississippi Mills", "Carleton Place downtown"],
    description:
      "Scraply Auto serves Carleton Place, Almonte, and all of Lanark County west of Ottawa. We come to you — no matter the condition of the vehicle.",
  },
  kemptville: {
    name: "Kemptville",
    province: "ON",
    neighborhoods: ["North Grenville", "Merrickville", "Oxford Mills", "Bishops Mills"],
    description:
      "Scraply Auto buys junk cars in the Kemptville and North Grenville area, south of Ottawa. Free towing, fast pickup, cash guaranteed on the spot.",
  },
  "smiths-falls": {
    name: "Smiths Falls",
    province: "ON",
    neighborhoods: ["Smiths Falls downtown", "Montague", "Rideau Lakes", "Beckwith"],
    description:
      "Scraply Auto offers junk vehicle buyback in Smiths Falls and surrounding areas. Located about 75 km southwest of Ottawa, we cover the entire region with free towing service.",
  },
  arnprior: {
    name: "Arnprior",
    province: "ON",
    neighborhoods: ["Arnprior downtown", "McNab-Braeside", "White Lake", "Renfrew County"],
    description:
      "Scraply Auto serves Arnprior and surrounding villages in Renfrew County. We pick up your junk or damaged car at no towing cost, regardless of its condition.",
  },
  perth: {
    name: "Perth",
    province: "ON",
    neighborhoods: ["Perth downtown", "Tay Valley", "Drummond-North Elmsley", "Lanark Highlands"],
    description:
      "Scraply Auto buys vehicles in Perth and the municipalities of Lanark County. We offer fast assessments, free pickup, and cash payment on the same day.",
  },
  hawkesbury: {
    name: "Hawkesbury",
    province: "ON",
    neighborhoods: ["Hawkesbury downtown", "Vankleek Hill", "L'Orignal", "Champlain Township"],
    description:
      "Scraply Auto covers Hawkesbury and all of Prescott and Russell County east of Ottawa. Bilingual service, free towing, offer within 24 hours.",
  },
}

export async function generateStaticParams() {
  return Object.keys(cityData).map((city) => ({ city }))
}

export async function generateMetadata({ params }) {
  const { city } = await params
  const data = cityData[city]

  if (!data) return { title: "Not Found" }

  return {
    title: `Sell Junk Car in ${data.name} — Free Towing | Scraply Auto`,
    description: `Get top cash for your junk car in ${data.name}, ${data.province}. Free towing, same-day pickup. Licensed auto recycler. Call now for a free quote.`,
    keywords: [
      `junk car ${data.name}`,
      `sell junk car ${data.name}`,
      `cash for cars ${data.name}`,
      `scrap car removal ${data.name}`,
      `junk car pickup ${data.name} Ontario`,
    ],
    openGraph: {
      title: `Sell Your Junk Car in ${data.name} | Scraply Auto`,
      description: `Free towing, same-day pickup, instant cash offer in ${data.name}, ${data.province}.`,
    },
  }
}

export default async function CityPage({ params }) {
  const { city } = await params
  const data = cityData[city]

  if (!data) notFound()

  return (
    <main>

      {/* Hero */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-2 text-orange-400 text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" />
            <span>{data.name}, {data.province}</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black leading-tight">
            Sell Your Junk Car in{" "}
            <span className="text-orange-500">{data.name}</span> — Free Towing
          </h1>
          <p className="mt-6 text-xl text-slate-300 max-w-2xl leading-relaxed">
            Get instant cash for your scrap, damaged, or non-running vehicle.
            Free towing and same-day pickup anywhere in {data.name}.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-10 h-14 rounded-full font-bold shadow-lg"
              nativeButton={false} render={<Link href="/#quote" />}
            >
              Get Free Quote
            </Button>
            <a
              href="tel:+16475550100"
              className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 hover:border-white/60 text-base px-8 h-14 rounded-full font-semibold transition-all"
            >
              <Phone className="w-5 h-5" />
              (647) 555-0100
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Junk Car Removal in {data.name}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">{data.description}</p>

          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {[
              "Free towing from any address",
              "Same-day or next-day pickup",
              "Cash paid on pickup",
              "Any make, model, or year accepted",
              "Running or not — we buy it",
              "Licensed Ontario auto recycler",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Areas We Serve in {data.name}
          </h2>
          <p className="text-gray-500 mb-8 text-sm">
            We pick up junk cars from every neighborhood in {data.name}, including:
          </p>
          <div className="flex flex-wrap gap-3">
            {data.neighborhoods.map((n) => (
              <span
                key={n}
                className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700"
              >
                {n}
              </span>
            ))}
            <span className="bg-orange-50 border border-orange-100 rounded-full px-4 py-2 text-sm font-medium text-orange-600">
              And all surrounding areas
            </span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-orange-500 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-black mb-4">
            Get Cash for Your Junk Car in {data.name} Today
          </h2>
          <p className="text-orange-100 text-lg mb-8">
            Free towing · Same-day pickup · Cash on the spot
          </p>
          <Button
            size="lg"
            className="bg-white text-orange-500 hover:bg-orange-50 px-10 h-14 rounded-full font-bold shadow-lg"
            nativeButton={false} render={<Link href="/#quote" />}
          >
            Get My Free Quote
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
