"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import Image from "next/image"
import Link from "next/link"
import { Pencil, Trash2, Eye, MoreHorizontal, AlertCircle } from "lucide-react"

// Mock data for user's property listings
const listings = [
  {
    id: 1,
    title: "modern penthouse",
    address: "123 skyline avenue, new york",
    price: "$8,500,000",
    status: "active",
    featured: true,
    views: 245,
    inquiries: 12,
    image: "/placeholder.svg?height=200&width=300",
    dateAdded: "2023-06-15",
  },
  {
    id: 2,
    title: "beachfront villa",
    address: "456 ocean drive, malibu",
    price: "$12,000,000",
    status: "pending review",
    featured: false,
    views: 0,
    inquiries: 0,
    image: "/placeholder.svg?height=200&width=300",
    dateAdded: "2023-07-02",
  },
  {
    id: 3,
    title: "downtown loft",
    address: "101 urban street, chicago",
    price: "$2,800,000",
    status: "active",
    featured: false,
    views: 187,
    inquiries: 8,
    image: "/placeholder.svg?height=200&width=300",
    dateAdded: "2023-05-20",
  },
]

export default function MyListingsPage() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
  const [showActionMenu, setShowActionMenu] = useState<number | null>(null)

  const handleDeleteClick = (id: number) => {
    setShowDeleteConfirm(id)
  }

  const confirmDelete = (id: number) => {
    // In a real app, this would call an API to delete the listing
    console.log(`Deleting listing ${id}`)
    setShowDeleteConfirm(null)
    // For demo purposes, we're not actually removing the item from the array
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(null)
  }

  const toggleActionMenu = (id: number) => {
    if (showActionMenu === id) {
      setShowActionMenu(null)
    } else {
      setShowActionMenu(id)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600"
      case "pending review":
        return "text-orange-500"
      case "inactive":
        return "text-gray-500"
      default:
        return "text-gray-700"
    }
  }

  return (
    <main>
      <Navbar isLoggedIn={true} />

      <div className="max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center my-8 md:my-12">
          <h1 className="text-4xl md:text-5xl font-normal">my listings</h1>
          <Link
            href="/list-property"
            className="bg-[#00FF00] text-black px-4 py-2 hover:bg-opacity-90 transition-colors"
          >
            Add New Listing
          </Link>
        </div>

        {listings.length === 0 ? (
          <div className="text-center py-12 border">
            <p className="text-xl mb-4">You haven't listed any properties yet.</p>
            <Link href="/list-property" className="bg-[#00FF00] text-black px-6 py-3 inline-block">
              List Your First Property
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {listings.map((listing, index) => (
              <div
                key={listing.id}
                className="border p-6 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Property Image */}
                  <div className="w-full md:w-64 h-48 relative">
                    <Image
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      fill
                      className="object-cover"
                    />
                    {listing.featured && (
                      <div className="absolute top-0 left-0 bg-[#00FF00] px-3 py-1 text-black text-sm">Featured</div>
                    )}
                  </div>

                  {/* Property Details */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h2 className="text-2xl mb-2">{listing.title}</h2>
                      <div className="relative">
                        <button
                          onClick={() => toggleActionMenu(listing.id)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <MoreHorizontal size={20} />
                        </button>

                        {/* Action Menu */}
                        {showActionMenu === listing.id && (
                          <div className="absolute right-0 mt-1 w-48 bg-white border shadow-lg z-10 animate-fade-in">
                            <Link
                              href={`/properties/${listing.id}`}
                              className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors"
                            >
                              <Eye size={16} className="mr-2" />
                              View Listing
                            </Link>
                            <Link
                              href={`/edit-property/${listing.id}`}
                              className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors"
                            >
                              <Pencil size={16} className="mr-2" />
                              Edit Listing
                            </Link>
                            <button
                              onClick={() => handleDeleteClick(listing.id)}
                              className="flex items-center px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors w-full text-left"
                            >
                              <Trash2 size={16} className="mr-2" />
                              Delete Listing
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="mb-2">{listing.address}</p>
                    <p className="mb-2 font-medium">{listing.price}</p>
                    <p className="mb-4">
                      <span className={`font-medium ${getStatusColor(listing.status)}`}>Status: {listing.status}</span>
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Date Added:</span>{" "}
                        {new Date(listing.dateAdded).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Views:</span> {listing.views}
                      </div>
                      <div>
                        <span className="font-medium">Inquiries:</span> {listing.inquiries}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons (visible on larger screens) */}
                  <div className="hidden md:flex flex-col gap-2 min-w-[120px]">
                    <Link
                      href={`/edit-property/${listing.id}`}
                      className="flex items-center justify-center bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors"
                    >
                      <Pencil size={16} className="mr-2" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(listing.id)}
                      className="flex items-center justify-center border border-red-600 text-red-600 px-4 py-2 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete
                    </button>
                  </div>
                </div>

                {/* Mobile Action Buttons */}
                <div className="flex gap-2 mt-4 md:hidden">
                  <Link
                    href={`/edit-property/${listing.id}`}
                    className="flex-1 flex items-center justify-center bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors"
                  >
                    <Pencil size={16} className="mr-2" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(listing.id)}
                    className="flex-1 flex items-center justify-center border border-red-600 text-red-600 px-4 py-2 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Delete
                  </button>
                </div>

                {/* Delete Confirmation */}
                {showDeleteConfirm === listing.id && (
                  <div className="mt-4 p-4 border border-red-200 bg-red-50 animate-fade-in">
                    <div className="flex items-start">
                      <AlertCircle size={20} className="text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-red-600">Are you sure you want to delete this listing?</p>
                        <p className="text-sm text-gray-600 mt-1">
                          This action cannot be undone. The listing will be permanently removed from our platform.
                        </p>
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => confirmDelete(listing.id)}
                            className="bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition-colors"
                          >
                            Yes, Delete
                          </button>
                          <button
                            onClick={cancelDelete}
                            className="border px-4 py-2 hover:bg-gray-100 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
