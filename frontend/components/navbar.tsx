"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserAccountDropdown } from "./user-account-dropdown"
import { NotificationDropdown } from "./notification-dropdown"
import { Menu, X, Plus, Calendar } from "lucide-react"
import { useState } from "react"

interface NavbarProps {
  isLoggedIn?: boolean
}

export function Navbar({ isLoggedIn = false }: NavbarProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Don't show navbar on login and signup pages
  if (pathname === "/login" || pathname === "/signup") {
    return null
  }

  return (
    <nav className="border-b">
      {/* Desktop Navbar */}
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between py-4 md:py-6">
        <div className="flex items-center space-x-2">
          <UserAccountDropdown />
          {isLoggedIn && <NotificationDropdown />}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden focus:outline-none" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex justify-center space-x-8">
          {isLoggedIn ? (
            <>
              <Link href="/" className={`hover:underline transition-colors ${pathname === "/" ? "font-semibold" : ""}`}>
                home
              </Link>
              <Link
                href="/properties"
                className={`hover:underline transition-colors ${pathname.startsWith("/properties") ? "font-semibold" : ""}`}
              >
                properties
              </Link>
              <Link
                href="/my-bookings"
                className={`hover:underline transition-colors ${pathname === "/my-bookings" ? "font-semibold" : ""}`}
              >
                my bookings
              </Link>
              <Link
                href="/my-listings"
                className={`hover:underline transition-colors ${pathname === "/my-listings" ? "font-semibold" : ""}`}
              >
                my listings
              </Link>
              <Link
                href="/viewing-requests"
                className={`hover:underline transition-colors ${pathname === "/viewing-requests" ? "font-semibold" : ""}`}
              >
                viewing requests
              </Link>
              <Link
                href="/account"
                className={`hover:underline transition-colors ${pathname === "/account" ? "font-semibold" : ""}`}
              >
                account
              </Link>
            </>
          ) : (
            <>
              <Link href="/" className={`hover:underline transition-colors ${pathname === "/" ? "font-semibold" : ""}`}>
                home
              </Link>
              <Link
                href="/properties"
                className={`hover:underline transition-colors ${pathname.startsWith("/properties") ? "font-semibold" : ""}`}
              >
                properties
              </Link>
              <Link
                href="/about"
                className={`hover:underline transition-colors ${pathname === "/about" ? "font-semibold" : ""}`}
              >
                about
              </Link>
              <Link
                href="/contact"
                className={`hover:underline transition-colors ${pathname === "/contact" ? "font-semibold" : ""}`}
              >
                contact
              </Link>
            </>
          )}
        </div>

        {/* List Property Button */}
        <div className="hidden md:block">
          <Link
            href="/list-property"
            className="flex items-center bg-[#00FF00] text-black px-4 py-2 hover:bg-opacity-90 transition-colors"
          >
            <Plus size={16} className="mr-1" />
            List Property
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t animate-fade-in">
          <div className="flex flex-col">
            {isLoggedIn && (
              <div className="px-4 py-3 border-t flex items-center">
                <NotificationDropdown />
                <span className="ml-2">notifications</span>
              </div>
            )}
            {isLoggedIn ? (
              <>
                <Link
                  href="/"
                  className={`px-4 py-3 ${pathname === "/" ? "font-semibold bg-gray-100" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  home
                </Link>
                <Link
                  href="/properties"
                  className={`px-4 py-3 border-t ${pathname.startsWith("/properties") ? "font-semibold bg-gray-100" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  properties
                </Link>
                <Link
                  href="/my-bookings"
                  className={`px-4 py-3 border-t ${pathname === "/my-bookings" ? "font-semibold bg-gray-100" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  my bookings
                </Link>
                <Link
                  href="/my-listings"
                  className={`px-4 py-3 border-t ${pathname === "/my-listings" ? "font-semibold bg-gray-100" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  my listings
                </Link>
                <Link
                  href="/viewing-requests"
                  className={`px-4 py-3 border-t flex items-center ${pathname === "/viewing-requests" ? "font-semibold bg-gray-100" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Calendar size={16} className="mr-1" />
                  viewing requests
                </Link>
                <Link
                  href="/account"
                  className={`px-4 py-3 border-t ${pathname === "/account" ? "font-semibold bg-gray-100" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  account
                </Link>
                <Link
                  href="/list-property"
                  className={`px-4 py-3 border-t flex items-center ${pathname === "/list-property" ? "font-semibold bg-gray-100" : "bg-[#00FF00]"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Plus size={16} className="mr-1" />
                  list property
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className={`px-4 py-3 ${pathname === "/" ? "font-semibold bg-gray-100" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  home
                </Link>
                <Link
                  href="/properties"
                  className={`px-4 py-3 border-t ${pathname.startsWith("/properties") ? "font-semibold bg-gray-100" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  properties
                </Link>
                <Link
                  href="/about"
                  className={`px-4 py-3 border-t ${pathname === "/about" ? "font-semibold bg-gray-100" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  about
                </Link>
                <Link
                  href="/contact"
                  className={`px-4 py-3 border-t ${pathname === "/contact" ? "font-semibold bg-gray-100" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  contact
                </Link>
                <Link
                  href="/list-property"
                  className={`px-4 py-3 border-t flex items-center ${pathname === "/list-property" ? "font-semibold bg-gray-100" : "bg-[#00FF00]"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Plus size={16} className="mr-1" />
                  list property
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
