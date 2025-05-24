"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"

// Mock data for properties
const properties = [
  {
    id: 1,
    title: "modern penthouse",
    location: "new york",
    price: "$8,500,000",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 2,
    title: "beachfront villa",
    location: "malibu",
    price: "$12,000,000",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 3,
    title: "mountain retreat",
    location: "aspen",
    price: "$5,200,000",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 4,
    title: "downtown loft",
    location: "chicago",
    price: "$2,800,000",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 5,
    title: "luxury condo",
    location: "miami",
    price: "$3,900,000",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 6,
    title: "historic mansion",
    location: "boston",
    price: "$7,200,000",
    image: "/placeholder.svg?height=400&width=400",
  },
]

export function PropertyGrid() {
  const [favorites, setFavorites] = useState<number[]>([])

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
    <div className="animate-fade-in">
      <p className="mb-6">showing 12 of 36 results</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {properties.map((property, index) => (
          <div
            key={property.id}
            className="border hover:shadow-md transition-shadow duration-300 relative"
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
              </div>
              <div className="p-3 md:p-4">
                <h3 className="text-lg md:text-xl">{property.title}</h3>
                <p className="mt-1 md:mt-2 text-sm md:text-base">
                  {property.location} • {property.price}
                </p>
              </div>
            </Link>
            <button
              className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
              onClick={(e) => toggleFavorite(e, property.id)}
            >
              <Heart className={`h-5 w-5 ${favorites.includes(property.id) ? "fill-[#00FF00] text-[#00FF00]" : ""}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
