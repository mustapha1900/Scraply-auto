const brands = [
  "Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "Hyundai", "Kia",
  "Jeep", "Ram", "GMC", "Dodge", "Chrysler", "Subaru", "Mazda",
  "BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Volvo", "Tesla",
  "Mitsubishi", "Acura", "Lexus", "Lincoln", "Cadillac", "Buick",
  "Pontiac", "Saturn", "Oldsmobile", "Infiniti", "Scion", "MINI",
]

export default function BrandsSection() {
  const doubled = [...brands, ...brands]

  return (
    <section className="py-10 bg-white border-y border-gray-100 overflow-hidden">
      <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
        We buy all makes &amp; models
      </p>
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-4 w-max"
          style={{ animation: "marquee 35s linear infinite" }}
        >
          {doubled.map((brand, i) => (
            <span
              key={i}
              className="px-5 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm font-semibold text-gray-600 whitespace-nowrap hover:border-orange-300 hover:text-orange-500 transition-colors cursor-default"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
