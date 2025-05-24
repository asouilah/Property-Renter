"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import {
  Home,
  MapPin,
  Bed,
  Bath,
  Square,
  Upload,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Info,
  Map,
  Eye,
} from "lucide-react"

// Declare google variable
declare global {
  interface Window {
    google: any
  }
}

type FormStep = "basics" | "details" | "location" | "amenities" | "photos" | "preview" | "success"

export function PropertyListingForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>("basics")
  const [formData, setFormData] = useState({
    // Basic Information
    title: "",
    description: "",
    propertyType: "",
    listingType: "sale", // sale or rent

    // Location
    address: "",
    city: "",
    state: "",
    zipCode: "",
    latitude: 40.7128, // Default to New York City coordinates
    longitude: -74.006,

    // Pricing
    price: "",

    // Details
    bedrooms: "",
    bathrooms: "",
    squareFeet: "",
    yearBuilt: "",
    lotSize: "",
    stories: "",
    parking: "",

    // Amenities
    amenities: [] as string[],

    // Additional Information
    availableFrom: "",
    petsAllowed: false,
    furnished: false,

    // Photos
    photos: [] as string[],
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [marker, setMarker] = useState<google.maps.Marker | null>(null)

  const propertyTypes = [
    "House",
    "Apartment",
    "Condo",
    "Townhouse",
    "Villa",
    "Penthouse",
    "Loft",
    "Studio",
    "Duplex",
    "Mobile Home",
    "Land",
    "Commercial",
  ]

  const amenitiesList = [
    "Air Conditioning",
    "Heating",
    "Washer/Dryer",
    "Dishwasher",
    "Refrigerator",
    "Microwave",
    "Oven",
    "Balcony",
    "Patio",
    "Garden",
    "Pool",
    "Gym",
    "Elevator",
    "Parking",
    "Garage",
    "Security System",
    "Fireplace",
    "Walk-in Closet",
    "High Ceilings",
    "Hardwood Floors",
    "Carpet",
    "Tile Floors",
    "Wheelchair Access",
    "Storage",
    "Basement",
    "Attic",
    "Smart Home Features",
    "Solar Panels",
    "EV Charging",
    "Water View",
    "Mountain View",
    "City View",
    "Private Entrance",
    "Doorman",
  ]

  // Load Google Maps script
  useEffect(() => {
    if (currentStep === "location" && !mapLoaded) {
      // In a real application, you would load the Google Maps API here
      // For this demo, we'll simulate the map loading
      setTimeout(() => {
        setMapLoaded(true)
        initializeMap()
      }, 500)
    }
  }, [currentStep, mapLoaded])

  // Initialize map when loaded
  const initializeMap = () => {
    if (typeof window !== "undefined" && mapRef.current) {
      // This is a simulation of Google Maps API
      // In a real app, you would use the actual Google Maps API
      console.log("Map initialized with coordinates:", formData.latitude, formData.longitude)

      // Simulate setting up a map
      setMap({} as google.maps.Map)
      setMarker({} as google.maps.Marker)
    }
  }

  // Update marker position when map is clicked
  const handleMapClick = (event: React.MouseEvent) => {
    // In a real app, you would get coordinates from the Google Maps click event
    // For this demo, we'll simulate updating coordinates
    const newLat = formData.latitude + (Math.random() * 0.01 - 0.005)
    const newLng = formData.longitude + (Math.random() * 0.01 - 0.005)

    setFormData({
      ...formData,
      latitude: newLat,
      longitude: newLng,
    })

    console.log("Map clicked, new coordinates:", newLat, newLng)
  }

  // Geocode address to get coordinates
  const geocodeAddress = () => {
    if (formData.address && formData.city && formData.state) {
      const fullAddress = `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`

      // In a real app, you would use the Google Geocoding API
      // For this demo, we'll simulate getting coordinates
      const simulatedLat = 40.7128 + (Math.random() * 0.1 - 0.05)
      const simulatedLng = -74.006 + (Math.random() * 0.1 - 0.05)

      setFormData({
        ...formData,
        latitude: simulatedLat,
        longitude: simulatedLng,
      })

      console.log("Geocoded address:", fullAddress, "to coordinates:", simulatedLat, simulatedLng)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData({
      ...formData,
      [name]: checked,
    })
  }

  const handleAmenityToggle = (amenity: string) => {
    if (formData.amenities.includes(amenity)) {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter((a) => a !== amenity),
      })
    } else {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, amenity],
      })
    }
  }

  const handlePhotoUpload = () => {
    // In a real app, this would handle file uploads to a server
    // For this demo, we'll just simulate adding placeholder images
    if (formData.photos.length < 10) {
      const newPhoto = `/placeholder.svg?height=600&width=800&text=Property+Photo+${formData.photos.length + 1}`
      setFormData({
        ...formData,
        photos: [...formData.photos, newPhoto],
      })
    }
  }

  const removePhoto = (index: number) => {
    setFormData({
      ...formData,
      photos: formData.photos.filter((_, i) => i !== index),
    })
  }

  const nextStep = () => {
    switch (currentStep) {
      case "basics":
        setCurrentStep("details")
        break
      case "details":
        setCurrentStep("location")
        break
      case "location":
        setCurrentStep("amenities")
        break
      case "amenities":
        setCurrentStep("photos")
        break
      case "photos":
        setCurrentStep("preview")
        break
      case "preview":
        setCurrentStep("success")
        break
      default:
        break
    }
  }

  const prevStep = () => {
    switch (currentStep) {
      case "details":
        setCurrentStep("basics")
        break
      case "location":
        setCurrentStep("details")
        break
      case "amenities":
        setCurrentStep("location")
        break
      case "photos":
        setCurrentStep("amenities")
        break
      case "preview":
        setCurrentStep("photos")
        break
      default:
        break
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case "basics":
        return formData.title && formData.description && formData.propertyType
      case "details":
        return formData.price && formData.bedrooms && formData.bathrooms && formData.squareFeet
      case "location":
        return formData.address && formData.city && formData.state && formData.zipCode
      case "amenities":
        return true // Amenities are optional
      case "photos":
        return formData.photos.length > 0
      case "preview":
        return true
      default:
        return false
    }
  }

  const submitListing = () => {
    // In a real app, this would send the data to your backend
    console.log("Submitting property listing:", formData)
    setCurrentStep("success")
  }

  // Get Google Maps URL for the property location
  const getGoogleMapsUrl = () => {
    return `https://www.google.com/maps?q=${formData.latitude},${formData.longitude}`
  }

  return (
    <div className="border p-6 animate-fade-in">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between">
          {["basics", "details", "location", "amenities", "photos", "preview"].map((step) => (
            <div
              key={step}
              className={`flex flex-col items-center ${currentStep === step ? "text-[#00FF00] font-medium" : ""}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 
                  ${
                    currentStep === step
                      ? "bg-[#00FF00] text-black"
                      : currentStep === "success" ||
                          (step === "basics" &&
                            ["details", "location", "amenities", "photos", "preview"].includes(currentStep)) ||
                          (step === "details" &&
                            ["location", "amenities", "photos", "preview"].includes(currentStep)) ||
                          (step === "location" && ["amenities", "photos", "preview"].includes(currentStep)) ||
                          (step === "amenities" && ["photos", "preview"].includes(currentStep)) ||
                          (step === "photos" && ["preview"].includes(currentStep))
                        ? "bg-gray-200 text-black"
                        : "bg-gray-100 text-gray-400"
                  }`}
              >
                {step === "basics" && <Home size={16} />}
                {step === "details" && <Info size={16} />}
                {step === "location" && <MapPin size={16} />}
                {step === "amenities" && <Check size={16} />}
                {step === "photos" && <Upload size={16} />}
                {step === "preview" && <Eye size={16} />}
              </div>
              <span className="text-xs capitalize hidden md:block">{step}</span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
          <div
            className="absolute top-0 left-0 h-1 bg-[#00FF00] transition-all duration-300"
            style={{
              width:
                currentStep === "basics"
                  ? "16.66%"
                  : currentStep === "details"
                    ? "33.33%"
                    : currentStep === "location"
                      ? "50%"
                      : currentStep === "amenities"
                        ? "66.66%"
                        : currentStep === "photos"
                          ? "83.33%"
                          : currentStep === "preview" || currentStep === "success"
                            ? "100%"
                            : "0%",
            }}
          ></div>
        </div>
      </div>

      {/* Basic Information Step */}
      {currentStep === "basics" && (
        <div className="space-y-6 animate-slide-in">
          <h2 className="text-2xl font-normal mb-4">basic information</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block mb-1">
                property title*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Modern Penthouse with City Views"
                required
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="description" className="block mb-1">
                description*
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your property in detail..."
                required
                rows={5}
                className="w-full border border-gray-300 p-3 focus:outline-none"
              ></textarea>
            </div>

            <div>
              <label htmlFor="propertyType" className="block mb-1">
                property type*
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 p-3 focus:outline-none"
              >
                <option value="">Select property type</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type.toLowerCase()}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1">listing type*</label>
              <div className="flex border">
                <button
                  type="button"
                  className={`flex-1 py-3 ${formData.listingType === "sale" ? "bg-[#00FF00]" : ""}`}
                  onClick={() => setFormData({ ...formData, listingType: "sale" })}
                >
                  For Sale
                </button>
                <button
                  type="button"
                  className={`flex-1 py-3 border-l ${formData.listingType === "rent" ? "bg-[#00FF00]" : ""}`}
                  onClick={() => setFormData({ ...formData, listingType: "rent" })}
                >
                  For Rent
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Property Details Step */}
      {currentStep === "details" && (
        <div className="space-y-6 animate-slide-in">
          <h2 className="text-2xl font-normal mb-4">property details</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="price" className="block mb-1">
                {formData.listingType === "sale" ? "price*" : "yearly rent*"}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0"
                  required
                  className="w-full pl-7"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="bedrooms" className="block mb-1">
                  bedrooms*
                </label>
                <input
                  type="number"
                  id="bedrooms"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  min="0"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="bathrooms" className="block mb-1">
                  bathrooms*
                </label>
                <input
                  type="number"
                  id="bathrooms"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  min="0"
                  step="0.5"
                  required
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label htmlFor="squareFeet" className="block mb-1">
                square feet*
              </label>
              <input
                type="number"
                id="squareFeet"
                name="squareFeet"
                value={formData.squareFeet}
                onChange={handleInputChange}
                min="0"
                required
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="yearBuilt" className="block mb-1">
                  year built
                </label>
                <input
                  type="number"
                  id="yearBuilt"
                  name="yearBuilt"
                  value={formData.yearBuilt}
                  onChange={handleInputChange}
                  min="1800"
                  max={new Date().getFullYear()}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="lotSize" className="block mb-1">
                  lot size (acres)
                </label>
                <input
                  type="number"
                  id="lotSize"
                  name="lotSize"
                  value={formData.lotSize}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="stories" className="block mb-1">
                  stories
                </label>
                <input
                  type="number"
                  id="stories"
                  name="stories"
                  value={formData.stories}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="parking" className="block mb-1">
                  parking spaces
                </label>
                <input
                  type="number"
                  id="parking"
                  name="parking"
                  value={formData.parking}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full"
                />
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="text-xl font-normal mb-4">additional information</h3>

              <div className="space-y-4">
                <div>
                  <label htmlFor="availableFrom" className="block mb-1">
                    available from
                  </label>
                  <input
                    type="date"
                    id="availableFrom"
                    name="availableFrom"
                    value={formData.availableFrom}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="petsAllowed"
                    name="petsAllowed"
                    checked={formData.petsAllowed}
                    onChange={handleCheckboxChange}
                    className="mr-2 h-5 w-5"
                  />
                  <label htmlFor="petsAllowed">Pets allowed</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="furnished"
                    name="furnished"
                    checked={formData.furnished}
                    onChange={handleCheckboxChange}
                    className="mr-2 h-5 w-5"
                  />
                  <label htmlFor="furnished">Furnished</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Location Step */}
      {currentStep === "location" && (
        <div className="space-y-6 animate-slide-in">
          <h2 className="text-2xl font-normal mb-4">property location</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="address" className="block mb-1">
                address*
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Street address"
                required
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block mb-1">
                  city*
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="state" className="block mb-1">
                  state*
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label htmlFor="zipCode" className="block mb-1">
                zip code*
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>

            <div className="flex justify-end">
              <button type="button" onClick={geocodeAddress} className="bg-black text-white px-4 py-2 text-sm">
                Find on Map
              </button>
            </div>

            <div className="pt-4">
              <h3 className="text-lg font-normal mb-2">pinpoint exact location</h3>
              <p className="text-sm text-gray-500 mb-4">
                Click on the map to set the exact location of your property. This helps potential buyers or renters find
                your property easily.
              </p>

              {/* Map Container */}
              <div ref={mapRef} className="w-full h-64 bg-gray-100 border relative" onClick={handleMapClick}>
                {!mapLoaded ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                  </div>
                ) : (
                  <>
                    {/* Simulated Map - In a real app, this would be a Google Map */}
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                      <div className="text-center">
                        <Map size={32} className="mx-auto mb-2 text-gray-500" />
                        <p className="text-sm text-gray-500">Map View</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Latitude: {formData.latitude.toFixed(6)}, Longitude: {formData.longitude.toFixed(6)}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">Click anywhere to set location</p>
                      </div>
                    </div>

                    {/* Simulated Marker */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <MapPin size={24} className="text-[#00FF00]" />
                    </div>
                  </>
                )}
              </div>

              <div className="mt-2 text-sm text-gray-500">
                <p>
                  Coordinates: {formData.latitude.toFixed(6)}, {formData.longitude.toFixed(6)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Amenities Step */}
      {currentStep === "amenities" && (
        <div className="space-y-6 animate-slide-in">
          <h2 className="text-2xl font-normal mb-4">amenities</h2>
          <p className="mb-4">Select all amenities that apply to your property:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {amenitiesList.map((amenity) => (
              <div key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  id={amenity.replace(/\s+/g, "-").toLowerCase()}
                  checked={formData.amenities.includes(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                  className="mr-2 h-5 w-5"
                />
                <label htmlFor={amenity.replace(/\s+/g, "-").toLowerCase()}>{amenity}</label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Photos Step */}
      {currentStep === "photos" && (
        <div className="space-y-6 animate-slide-in">
          <h2 className="text-2xl font-normal mb-4">property photos</h2>
          <p className="mb-4">Upload photos of your property (maximum 10 photos):</p>

          <div className="border-2 border-dashed border-gray-300 p-6 text-center mb-6">
            <input
              type="file"
              id="photoUpload"
              ref={fileInputRef}
              accept="image/*"
              multiple
              className="hidden"
              onChange={handlePhotoUpload}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-gray-100 px-4 py-2 hover:bg-gray-200 transition-colors"
              disabled={formData.photos.length >= 10}
            >
              <Upload size={16} className="inline mr-2" />
              Select Photos
            </button>
            <p className="text-sm text-gray-500 mt-2">Click to select or drag and drop your photos here</p>
            <p className="text-sm text-gray-500 mt-1">{formData.photos.length}/10 photos uploaded</p>
          </div>

          {formData.photos.length > 0 && (
            <div>
              <h3 className="text-lg font-normal mb-3">uploaded photos:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <div className="relative h-32 w-full">
                      <Image
                        src={photo || "/placeholder.svg"}
                        alt={`Property photo ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                    {index === 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-[#00FF00] text-black text-xs py-1 text-center">
                        Main Photo
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Preview Step */}
      {currentStep === "preview" && (
        <div className="space-y-6 animate-slide-in">
          <h2 className="text-2xl font-normal mb-4">preview your listing</h2>
          <p className="mb-6">Review your property listing before submitting:</p>

          <div className="border p-4 mb-6">
            {formData.photos.length > 0 && (
              <div className="relative h-64 mb-4">
                <Image
                  src={formData.photos[0] || "/placeholder.svg"}
                  alt={formData.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-0 left-0 bg-[#00FF00] px-3 py-1 text-black text-sm">
                  {formData.listingType === "sale" ? "For Sale" : "For Rent"}
                </div>
              </div>
            )}

            <h3 className="text-2xl mb-2">{formData.title || "Property Title"}</h3>
            <p className="flex items-center text-gray-600 mb-2">
              <MapPin size={16} className="mr-1" />
              {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
            </p>
            <p className="text-xl font-semibold mb-4">
              ${formData.price} {formData.listingType === "rent" ? "/month" : ""}
            </p>

            <div className="flex justify-between mb-4 text-gray-600">
              <div className="flex items-center">
                <Bed size={16} className="mr-1" />
                <span>{formData.bedrooms || 0} bd</span>
              </div>
              <div className="flex items-center">
                <Bath size={16} className="mr-1" />
                <span>{formData.bathrooms || 0} ba</span>
              </div>
              <div className="flex items-center">
                <Square size={16} className="mr-1" />
                <span>{formData.squareFeet || 0} ft²</span>
              </div>
            </div>

            <p className="mb-4">{formData.description}</p>

            {/* Map Preview */}
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Location:</h4>
              <div className="relative h-48 bg-gray-100 border mb-2">
                {/* Simulated Map Preview */}
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <Map size={24} className="mx-auto mb-1 text-gray-500" />
                    <p className="text-sm text-gray-500">Map View</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formData.address}, {formData.city}, {formData.state}
                    </p>
                  </div>
                </div>

                {/* Simulated Marker */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <MapPin size={20} className="text-[#00FF00]" />
                </div>
              </div>
              <a
                href={getGoogleMapsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline flex items-center"
              >
                <Map size={14} className="mr-1" />
                View on Google Maps
              </a>
            </div>

            {formData.amenities.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Amenities:</h4>
                <div className="flex flex-wrap gap-2">
                  {formData.amenities.slice(0, 5).map((amenity) => (
                    <span key={amenity} className="bg-gray-100 px-2 py-1 text-sm">
                      {amenity}
                    </span>
                  ))}
                  {formData.amenities.length > 5 && (
                    <span className="bg-gray-100 px-2 py-1 text-sm">+{formData.amenities.length - 5} more</span>
                  )}
                </div>
              </div>
            )}

            <div className="text-sm text-gray-500">
              <p>Property Type: {formData.propertyType}</p>
              {formData.yearBuilt && <p>Year Built: {formData.yearBuilt}</p>}
              {formData.availableFrom && <p>Available From: {new Date(formData.availableFrom).toLocaleDateString()}</p>}
            </div>
          </div>

          <div className="bg-gray-50 p-4 border">
            <h3 className="font-semibold mb-2">Ready to submit?</h3>
            <p>
              Once submitted, your property listing will be reviewed by our team before being published on our platform.
              This process typically takes 24-48 hours.
            </p>
          </div>
        </div>
      )}

      {/* Success Step */}
      {currentStep === "success" && (
        <div className="text-center py-8 animate-fade-in">
          <div className="w-16 h-16 bg-[#00FF00] rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-black" />
          </div>
          <h2 className="text-2xl font-normal mb-4">listing submitted successfully!</h2>
          <p className="mb-6">
            Your property listing has been submitted and is now pending review. You will be notified once it is approved
            and published on our platform.
          </p>
          <button
            type="button"
            onClick={() => (window.location.href = "/")}
            className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
          >
            Return to Home
          </button>
        </div>
      )}

      {/* Navigation Buttons */}
      {currentStep !== "success" && (
        <div className="flex justify-between mt-8">
          {currentStep !== "basics" ? (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center border px-6 py-3 hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={16} className="mr-2" />
              Back
            </button>
          ) : (
            <div></div> // Empty div to maintain flex layout
          )}

          {currentStep !== "preview" ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={!isStepValid()}
              className={`flex items-center px-6 py-3 transition-colors ${
                isStepValid() ? "bg-black text-white hover:bg-gray-800" : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Next
              <ChevronRight size={16} className="ml-2" />
            </button>
          ) : (
            <button
              type="button"
              onClick={submitListing}
              className="bg-[#00FF00] text-black px-6 py-3 hover:bg-opacity-90 transition-colors"
            >
              Submit Listing
            </button>
          )}
        </div>
      )}
    </div>
  )
}
