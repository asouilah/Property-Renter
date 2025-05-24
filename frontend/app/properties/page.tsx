"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Search } from "@/components/search"
import Image from "next/image"
import Link from "next/link"
import { Heart, MapPin, Bed, Bath, Square } from "lucide-react"

// Mock data for properties with more details
const propertiesData = [
  {
    id: 1,
    title: "modern penthouse",
    location: "new york",
    address: "123 skyline avenue",
    price: "$8,500,000",
    bedrooms: 4,
    bathrooms: 3.5,
    squareFeet: 3500,
    image: "/placeholder.svg?height=400&width=400",
    featured: true,
  },
  {
    id: 2,
    title: "beachfront villa",
    location: "malibu",
    address: "456 ocean drive",
    price: "$12,000,000",
    bedrooms: 5,
    bathrooms: 4,
    squareFeet: 4200,
    image: "/placeholder.svg?height=400&width=400",
    featured: false,
  },
  {
    id: 3,
    title: "mountain retreat",
    location: "aspen",
    address: "789 pine road",
    price: "$5,200,000",
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 2800,
    image: "/placeholder.svg?height=400&width=400",
    featured: false,
  },
  {
    id: 4,
    title: "downtown loft",
    location: "chicago",
    address: "101 urban street",
    price: "$2,800,000",
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1800,
    image: "/placeholder.svg?height=400&width=400",
    featured: false,
  },
  {
    id: 5,
    title: "luxury condo",
    location: "miami",
    address: "222 beach boulevard",
    price: "$3,900,000",
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 2200,
    image: "/placeholder.svg?height=400&width=400",
    featured: false,
  },
  {
    id: 6,
    title: "historic mansion",
    location: "boston",
    address: "333 heritage lane",
    price: "$7,200,000",
    bedrooms: 6,
    bathrooms: 5.5,
    squareFeet: 5800,
    image: "/placeholder.svg?height=400&width=400",
    featured: true,
  },
]

export default function PropertiesPage() {
  const [favorites, setFavorites] = useState<number[]>([])

  // Sort properties to show featured ones first
  const properties = [...propertiesData].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return 0
  })

  const toggleFavorite = (e: React.MouseEvent, propertyId: number) => {
    e.preventDefault()
    e.stopPropagation()

    if (favorites.includes(propertyId)) {
      setFavorites(favorites.filter((id) => id !== propertyId))
    } else {
      setFavorites([...favorites, propertyId])
    }
  }

  return (
    <main>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4">
        <Search />

        <p className="mb-6">showing 12 of 36 results</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {properties.map((property, index) => (
            <div
              key={property.id}
              className="border hover:shadow-md transition-shadow duration-300 animate-fade-in relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link href={`/properties/${property.id}`}>
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {property.featured && (
                    <div className="absolute top-0 left-0 bg-[#00FF00] px-3 py-1 text-black text-sm">Featured</div>
                  )}
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="text-lg md:text-xl">{property.title}</h3>
                  <p className="flex items-center text-gray-600 mt-1 text-sm md:text-base">
                    <MapPin size={14} className="mr-1 flex-shrink-0" />
                    <span className="truncate">
                      {property.address}, {property.location}
                    </span>
                  </p>
                  <p className="font-semibold text-base md:text-lg mt-2">{property.price}</p>

                  <div className="flex justify-between mt-3 text-gray-600 text-xs md:text-sm">
                    <div className="flex items-center">
                      <Bed size={14} className="mr-1 flex-shrink-0" />
                      <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Bath size={14} className="mr-1 flex-shrink-0" />
                      <span>{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Square size={14} className="mr-1 flex-shrink-0" />
                      <span>{property.squareFeet} ft²</span>
                    </div>
                  </div>
                </div>
              </Link>
              <button
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
                onClick={(e) => toggleFavorite(e, property.id)}
              >
                <Heart
                  className={`h-4 w-4 md:h-5 md:w-5 ${favorites.includes(property.id) ? "fill-[#00FF00] text-[#00FF00]" : ""}`}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center my-12">
          <div className="flex border">
            <button className="px-3 py-2 md:px-4 border-r hover:bg-gray-100 transition-colors text-sm md:text-base">
              Previous
            </button>
            <button className="px-3 py-2 md:px-4 bg-[#00FF00] text-sm md:text-base">1</button>
            <button className="px-3 py-2 md:px-4 border-l hover:bg-gray-100 transition-colors text-sm md:text-base">
              2
            </button>
            <button className="px-3 py-2 md:px-4 border-l hover:bg-gray-100 transition-colors text-sm md:text-base">
              3
            </button>
            <button className="px-3 py-2 md:px-4 border-l hover:bg-gray-100 transition-colors text-sm md:text-base">
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
