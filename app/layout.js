import "./globals.css"
import { Inter } from "next/font/google"
import Navbar from "@/components/layout/Navbar"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: {
    default: "Scraply Auto | Sell Your Junk Car in Ottawa — Free Towing",
    template: "%s | Scraply Auto",
  },
  description:
    "Get top cash for your junk, scrap, or damaged car in Ottawa and Gatineau. Free towing, same-day pickup, offer within 24 hours. Serving all areas within 100 km of Ottawa.",
  keywords: [
    "junk car Ottawa",
    "sell junk car Ottawa",
    "cash for cars Ottawa",
    "scrap car removal Ottawa",
    "junk car Gatineau",
    "free towing Ottawa",
    "sell damaged car Ottawa",
    "car removal Ottawa Gatineau",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Scraply Auto",
    title: "Scraply Auto | Junk Car Buyers Ottawa & Gatineau",
    description:
      "Free towing, same-day pickup, cash on the spot. Ottawa, Gatineau, and 100 km around.",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-CA" className={inter.variable}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
