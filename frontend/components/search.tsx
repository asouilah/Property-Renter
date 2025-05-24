"use client"

import { useState } from "react"
import { X, ChevronDown } from "lucide-react"

export function Search() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [selectedBedrooms, setSelectedBedrooms] = useState<number[]>([])
  const [selectedBathrooms, setSelectedBathrooms] = useState<number[]>([])
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const toggleBedroomSelection = (bedroom: number) => {
    if (selectedBedrooms.includes(bedroom)) {
      setSelectedBedrooms(selectedBedrooms.filter((b) => b !== bedroom))
    } else {
      setSelectedBedrooms([...selectedBedrooms, bedroom])
    }
  }

  const toggleBathroomSelection = (bathroom: number) => {
    if (selectedBathrooms.includes(bathroom)) {
      setSelectedBathrooms(selectedBathrooms.filter((b) => b !== bathroom))
    } else {
      setSelectedBathrooms([...selectedBathrooms, bathroom])
    }
  }

  const applyFilters = () => {
    const newFilters = []

    if (minPrice && maxPrice) {
      newFilters.push(`$${minPrice} - $${maxPrice}`)
    } else if (minPrice) {
      newFilters.push(`Min $${minPrice}`)
    } else if (maxPrice) {
      newFilters.push(`Max $${maxPrice}`)
    }

    if (selectedBedrooms.length > 0) {
      newFilters.push(`${selectedBedrooms.sort().join(", ")} bed${selectedBedrooms.length === 1 ? "" : "s"}`)
    }

    if (selectedBathrooms.length > 0) {
      newFilters.push(`${selectedBathrooms.sort().join(", ")} bath${selectedBathrooms.length === 1 ? "" : "s"}`)
    }

    setActiveFilters(newFilters)
    setShowFilters(false)
    // Here you would also trigger the actual filtering of properties
  }

  const resetFilters = () => {
    setMinPrice("")
    setMaxPrice("")
    setSelectedBedrooms([])
    setSelectedBathrooms([])
    setActiveFilters([])
  }

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))

    // Reset the corresponding filter inputs
    if (filter.includes("$")) {
      setMinPrice("")
      setMaxPrice("")
    } else if (filter.includes("bed")) {
      setSelectedBedrooms([])
    } else if (filter.includes("bath")) {
      setSelectedBathrooms([])
    }
  }

  return (
    <div className="my-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row">
        <input type="text" placeholder="search properties..." className="flex-grow border sm:border-r-0" />
        <button className="bg-black text-white px-6 hover:bg-gray-800 transition-colors mt-2 sm:mt-0">search</button>
      </div>

      <div className="relative mt-4">
        <div className="flex flex-wrap border">
          <button
            className={`px-4 py-2 transition-colors ${activeFilter === "all" ? "bg-[#00FF00]" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            all
          </button>
          <button
            className={`px-4 py-2 border-l transition-colors ${activeFilter === "for sale" ? "bg-[#00FF00]" : ""}`}
            onClick={() => setActiveFilter("for sale")}
          >
            for sale
          </button>
          <button
            className={`px-4 py-2 border-l transition-colors ${activeFilter === "for rent" ? "bg-[#00FF00]" : ""}`}
            onClick={() => setActiveFilter("for rent")}
          >
            for rent
          </button>
          <button
            className="px-4 py-2 border-l flex items-center transition-colors"
            onClick={() => setShowFilters(!showFilters)}
          >
            filters{" "}
            <ChevronDown
              className={`ml-1 transform ${showFilters ? "rotate-180" : ""} transition-transform`}
              size={16}
            />
          </button>
        </div>

        {/* Dropdown Filters */}
        {showFilters && (
          <div className="absolute left-0 right-0 mt-1 bg-white border shadow-lg z-20 animate-fade-in">
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Price Range */}
              <div className="border p-3">
                <h3 className="text-sm font-medium mb-2">Price Range</h3>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full pl-7 pr-2 py-2 border"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </div>
                  <span className="text-gray-400">to</span>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full pl-7 pr-2 py-2 border"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Bedrooms */}
              <div className="border p-3">
                <h3 className="text-sm font-medium mb-2">Bedrooms</h3>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, "6+"].map((num) => (
                    <button
                      key={`bedroom-${num}`}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${
                        selectedBedrooms.includes(typeof num === "string" ? 6 : num)
                          ? "bg-[#00FF00] border-[#00FF00]"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => toggleBedroomSelection(typeof num === "string" ? 6 : num)}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bathrooms */}
              <div className="border p-3">
                <h3 className="text-sm font-medium mb-2">Bathrooms</h3>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, "5+"].map((num) => (
                    <button
                      key={`bathroom-${num}`}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${
                        selectedBathrooms.includes(typeof num === "string" ? 5 : num)
                          ? "bg-[#00FF00] border-[#00FF00]"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => toggleBathroomSelection(typeof num === "string" ? 5 : num)}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Apply Filters Button */}
            <div className="p-4 flex justify-end border-t">
              <button
                className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors"
                onClick={applyFilters}
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-500">Active filters:</span>
          {activeFilters.map((filter, index) => (
            <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded">
              <span className="mr-2 text-sm">{filter}</span>
              <button onClick={() => removeFilter(filter)}>
                <X size={14} />
              </button>
            </div>
          ))}
          <button className="text-sm text-gray-500 hover:text-black transition-colors ml-2" onClick={resetFilters}>
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}
