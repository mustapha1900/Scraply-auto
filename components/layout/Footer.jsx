import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

const navigation = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Junk Car Removal", href: "/services/junk-car-removal" },
    { label: "Scrap Car Pickup", href: "/services/scrap-cars" },
    { label: "Damaged Car Buyers", href: "/services/damaged-cars" },
    { label: "Salvage Car Buyers", href: "/services/salvage-cars" },
  ],
  areas: [
    { label: "Ottawa", href: "/areas/ottawa" },
    { label: "Gatineau", href: "/areas/gatineau" },
    { label: "Rockland", href: "/areas/rockland" },
    { label: "Carleton Place", href: "/areas/carleton-place" },
    { label: "Kemptville", href: "/areas/kemptville" },
    { label: "Smiths Falls", href: "/areas/smiths-falls" },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-black tracking-tight">
              Scraply<span className="text-orange-500">Auto</span>
            </Link>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed max-w-xs">
              Ottawa &amp; Gatineau&apos;s trusted junk car buyer. We make it easy to sell your
              scrap, damaged, or non-running vehicle — fast and for top dollar.
            </p>
            <div className="mt-6 space-y-2">
              <a
                href="tel:+16475550100"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                (647) 555-0100
              </a>
              <a
                href="mailto:info@scraplyauto.ca"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                info@scraplyauto.ca
              </a>
              <p className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                Ottawa, ON &amp; Gatineau, QC
              </p>
            </div>
          </div>

          {/* Navigation columns */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {navigation.company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              {navigation.services.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Service Areas
            </h3>
            <ul className="space-y-2">
              {navigation.areas.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Scraply Auto. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-slate-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-slate-500 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
