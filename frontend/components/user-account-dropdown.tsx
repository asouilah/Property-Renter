"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { User, Heart, Calendar, Settings, LogOut, Home, Clock } from "lucide-react"

export function UserAccountDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
      >
        <User size={20} />
        <span className="sr-only">User account</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white border shadow-lg rounded-sm z-10 animate-fade-in">
          <div className="py-2">
            <Link
              href="/account"
              className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <User size={16} className="mr-2" />
              Profile
            </Link>
            <Link
              href="/my-bookings"
              className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Calendar size={16} className="mr-2" />
              My Bookings
            </Link>
            <Link
              href="/my-listings"
              className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Home size={16} className="mr-2" />
              My Listings
            </Link>
            <Link
              href="/viewing-requests"
              className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Clock size={16} className="mr-2" />
              Viewing Requests
            </Link>
            <Link
              href="/favorites"
              className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Heart size={16} className="mr-2" />
              Favorites
            </Link>
            <Link
              href="/settings"
              className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Settings size={16} className="mr-2" />
              Settings
            </Link>
            <hr className="my-1" />
            <Link
              href="/login"
              className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
