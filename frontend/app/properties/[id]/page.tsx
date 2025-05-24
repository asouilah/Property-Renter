"use client"

import { useState, useRef } from "react"
import { Navbar } from "@/components/navbar"
import Image from "next/image"
import { BookingForm } from "@/components/booking-form"
import { ChevronLeft, ChevronRight, MapPin, Map, ExternalLink, Calendar } from "lucide-react"

// Mock data for a single property
const property = {
  id: 1,
  title: "modern penthouse",
  price: "$8,500,000",
  location: "new york",
  address: "123 skyline avenue, new york",
  bedrooms: 4,
  bathrooms: 3.5,
  squareFeet: 3500,
  yearBuilt: 2021,
  propertyType: "penthouse",
  latitude: 40.7128, // New York coordinates
  longitude: -74.006,
  description:
    "Perched atop a prestigious building in the heart of the city, this modern penthouse offers unparalleled luxury and breathtaking views of the skyline. Floor-to-ceiling windows flood the space with natural light, while high-end finishes and state-of-the-art appliances create a sophisticated living experience.",
  amenities: [
    "private elevator access",
    "gourmet kitchen with top-of-the-line appliances",
    "master suite with walk-in closet and spa-like bathroom",
    "large terrace with outdoor kitchen",
    "home automation system",
    "24/7 concierge service",
    "fitness center and spa",
    "entertainment area with pool table",
  ],
  images: [
    "/placeholder.svg?height=1080&width=1920",
    "/placeholder.svg?height=1080&width=1080",
    "/placeholder.svg?height=1080&width=1080",
    "/placeholder.svg?height=1080&width=1080",
    "/placeholder.svg?height=1080&width=1080",
  ],
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const bookingFormRef = useRef<HTMLDivElement>(null)

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === property.images.length - 1 ? 0 : prevIndex + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? property.images.length - 1 : prevIndex - 1))
  }

  // Generate Google Maps URL
  const getGoogleMapsUrl = () => {
    return `https://www.google.com/maps?q=${property.latitude},${property.longitude}`
  }

  // Generate Google Maps Directions URL
  const getDirectionsUrl = () => {
    return `https://www.google.com/maps/dir/?api=1&destination=${property.latitude},${property.longitude}`
  }

  // Scroll to booking form
  const scrollToBookingForm = () => {
    bookingFormRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-normal text-center my-8 md:my-12">{property.title}</h1>
        <p className="text-2xl md:text-3xl text-center mb-8 md:mb-12">{property.price}</p>

        {/* Image Gallery */}
        <div className="mb-8 md:mb-12">
          <div className="relative">
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] w-full">
              <Image
                src={property.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${property.title} image ${currentImageIndex + 1}`}
                fill
                className="object-cover"
              />
            </div>

            {/* Navigation Arrows */}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image Indicators - Made smaller */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full ${index === currentImageIndex ? "bg-[#00FF00]" : "bg-white"}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail Gallery - Green border on all sides for selected image */}
          <div className="flex mt-4 space-x-2 overflow-x-auto pb-2">
            {property.images.map((image, index) => (
              <button
                key={index}
                className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 relative ${
                  index === currentImageIndex ? "ring-2 ring-[#00FF00] ring-offset-0" : ""
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${property.title} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Schedule Viewing Button */}
          <div className="mt-4 text-center">
            <button
              onClick={scrollToBookingForm}
              className="bg-[#00FF00] text-black px-6 py-3 flex items-center justify-center mx-auto hover:bg-opacity-90 transition-colors"
            >
              <Calendar size={18} className="mr-2" />
              Schedule a Viewing
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-8 md:mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6">property details</h2>

            <div className="space-y-3 md:space-y-4">
              <p>
                <strong>bedrooms:</strong> {property.bedrooms}
              </p>
              <p>
                <strong>bathrooms:</strong> {property.bathrooms}
              </p>
              <p>
                <strong>square feet:</strong> {property.squareFeet}
              </p>
              <p>
                <strong>year built:</strong> {property.yearBuilt}
              </p>
              <p>
                <strong>property type:</strong> {property.propertyType}
              </p>
            </div>

            <p className="mt-4 md:mt-6">{property.description}</p>

            {/* Location Map */}
            <div className="mt-6">
              <h3 className="text-xl mb-3">location</h3>
              <div className="relative h-48 bg-gray-100 border mb-3">
                {/* Simulated Map - In a real app, this would be a Google Map */}
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <Map size={24} className="mx-auto mb-1 text-gray-500" />
                    <p className="text-sm text-gray-500">Map View</p>
                    <p className="text-xs text-gray-400 mt-1">{property.address}</p>
                  </div>
                </div>

                {/* Simulated Marker */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <MapPin size={20} className="text-[#00FF00]" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href={getGoogleMapsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors"
                >
                  <Map size={16} className="mr-2" />
                  View on Google Maps
                </a>
                <a
                  href={getDirectionsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center border px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  <ExternalLink size={16} className="mr-2" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6">amenities</h2>

            <ul className="space-y-3 md:space-y-4">
              {property.amenities.map((amenity, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2 text-xl">•</span>
                  <span>{amenity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div ref={bookingFormRef}>
          <BookingForm propertyId={params.id} />
        </div>
      </div>
    </main>
  )
}
