import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"

const cities = [
  {
    slug: "ottawa",
    name: "Ottawa",
    description: "All of Ottawa — Kanata, Barrhaven, Orleans, Nepean, Gloucester, and downtown.",
  },
  {
    slug: "gatineau",
    name: "Gatineau",
    description: "Hull, Aylmer, Buckingham, Masson-Angers, and all surrounding areas.",
  },
  {
    slug: "rockland",
    name: "Rockland",
    description: "Rockland, Clarence-Rockland, Bourget, and surrounding communities east of Ottawa.",
  },
  {
    slug: "carleton-place",
    name: "Carleton Place",
    description: "Carleton Place, Almonte, and all of Lanark County west of Ottawa.",
  },
  {
    slug: "kemptville",
    name: "Kemptville",
    description: "Kemptville, North Grenville, Merrickville, and Grenville County to the south.",
  },
]

export default function ServiceAreasSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">
          <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-3">
            Where We Operate
          </p>
          <h2 className="text-4xl font-bold text-slate-900">Service Areas</h2>
          <p className="text-gray-500 text-lg mt-3 max-w-xl mx-auto">
            We serve Ottawa, Gatineau, and all cities within a 100 km radius.
            Free towing included with every pickup.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/areas/${city.slug}`}
              className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                  <span className="font-bold text-slate-900 text-lg">{city.name}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{city.description}</p>
              <p className="text-xs font-semibold text-orange-500 mt-3">
                Sell my junk car in {city.name} →
              </p>
            </Link>
          ))}

          {/* And more card */}
          <div className="bg-orange-500 rounded-2xl p-6 text-white flex flex-col justify-between">
            <div>
              <p className="font-bold text-lg mb-2">And many more!</p>
              <p className="text-orange-100 text-sm leading-relaxed">
                We cover all areas within 100 km of Ottawa — Smiths Falls, Arnprior, Perth, Renfrew, Hawkesbury, and more.
              </p>
            </div>
            <Link
              href="/#quote"
              className="mt-4 text-sm font-semibold underline underline-offset-4 hover:text-orange-200 transition-colors"
            >
              Get a quote in your city →
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
