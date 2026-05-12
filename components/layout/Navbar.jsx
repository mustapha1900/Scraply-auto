"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#quote", label: "Get a Quote" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  if (pathname?.startsWith("/admin")) return null

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link href="/" className="text-2xl font-black text-slate-900 tracking-tight">
          Scraply<span className="text-orange-500">Auto</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+16475550100"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1.5 transition-colors"
          >
            <Phone className="w-4 h-4" />
            (647) 555-0100
          </a>
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 font-semibold"
            nativeButton={false} render={<Link href="/#quote" />}
          >
            Get Free Offer
          </Button>
        </div>

        {/* Mobile menu — SheetTrigger stylé directement, pas de Button imbriqué */}
        <Sheet>
          <SheetTrigger className="md:hidden inline-flex items-center justify-center rounded-lg p-2 hover:bg-gray-100 transition-colors">
            <Menu className="w-5 h-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="flex flex-col gap-1 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-gray-900 hover:text-orange-500 transition-colors py-3 border-b border-gray-100"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-6 space-y-3">
                <a
                  href="tel:+16475550100"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">(647) 555-0100</span>
                </a>
                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold"
                  nativeButton={false} render={<Link href="/#quote" />}
                >
                  Get Free Offer
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

      </div>
    </header>
  )
}
