"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import Image from "next/image"
import { Calendar, Clock, User, Check, X, MessageSquare, Bell } from "lucide-react"

// Mock data for viewing requests
const viewingRequests = [
  {
    id: 1,
    property: {
      id: 1,
      title: "modern penthouse",
      address: "123 skyline avenue, new york",
      image: "/placeholder.svg?height=200&width=300",
    },
    user: {
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "(555) 123-4567",
      verificationStatus: "verified",
    },
    requestedDate: "2023-07-15",
    requestedTime: "2:00 PM",
    status: "pending",
  },
  {
    id: 2,
    property: {
      id: 2,
      title: "beachfront villa",
      address: "456 ocean drive, malibu",
      image: "/placeholder.svg?height=200&width=300",
    },
    user: {
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      phone: "(555) 987-6543",
      verificationStatus: "verified",
    },
    requestedDate: "2023-07-18",
    requestedTime: "11:00 AM",
    status: "pending",
  },
  {
    id: 3,
    property: {
      id: 3,
      title: "downtown loft",
      address: "101 urban street, chicago",
      image: "/placeholder.svg?height=200&width=300",
    },
    user: {
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "(555) 456-7890",
      verificationStatus: "pending",
    },
    requestedDate: "2023-07-22",
    requestedTime: "3:30 PM",
    status: "pending",
  },
]

// Mock function to simulate sending a notification
const sendNotification = (title: string, message: string, type: string) => {
  console.log(`Notification sent: ${title} - ${message} (${type})`)
  // In a real app, this would call an API to create a notification
}

export default function ViewingRequestsPage() {
  const [requests, setRequests] = useState(viewingRequests)
  const [showCounterOffer, setShowCounterOffer] = useState<number | null>(null)
  const [counterOfferDate, setCounterOfferDate] = useState("")
  const [counterOfferTime, setCounterOfferTime] = useState("")
  const [showNotificationBanner, setShowNotificationBanner] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")

  // Show notification banner temporarily
  const displayNotification = (message: string) => {
    setNotificationMessage(message)
    setShowNotificationBanner(true)
    setTimeout(() => {
      setShowNotificationBanner(false)
    }, 5000)
  }

  const handleAccept = (id: number) => {
    const request = requests.find((req) => req.id === id)
    if (request) {
      setRequests(requests.map((req) => (req.id === id ? { ...req, status: "accepted" } : req)))

      // Send notification to the user
      sendNotification(
        "Viewing Accepted",
        `Your request to view '${request.property.title}' has been accepted`,
        "viewing-accepted",
      )

      displayNotification(
        `Viewing request for ${request.property.title} has been accepted. The user has been notified.`,
      )
    }
  }

  const handleReject = (id: number) => {
    const request = requests.find((req) => req.id === id)
    if (request) {
      setRequests(requests.map((req) => (req.id === id ? { ...req, status: "rejected" } : req)))

      // Send notification to the user
      sendNotification(
        "Viewing Rejected",
        `Your request to view '${request.property.title}' has been rejected`,
        "viewing-rejected",
      )

      displayNotification(
        `Viewing request for ${request.property.title} has been rejected. The user has been notified.`,
      )
    }
  }

  const openCounterOffer = (id: number, date: string, time: string) => {
    setShowCounterOffer(id)
    setCounterOfferDate(date)
    setCounterOfferTime(time)
  }

  const sendCounterOffer = (id: number) => {
    if (counterOfferDate && counterOfferTime) {
      const request = requests.find((req) => req.id === id)
      if (request) {
        setRequests(
          requests.map((req) =>
            req.id === id
              ? {
                  ...req,
                  status: "counter-offered",
                  counterOffer: {
                    date: counterOfferDate,
                    time: counterOfferTime,
                  },
                }
              : req,
          ),
        )

        // Send notification to the user
        sendNotification(
          "Alternative Time Suggested",
          `Property owner suggested a different time for '${request.property.title}'`,
          "counter-offer",
        )

        displayNotification(`Counter offer sent for ${request.property.title}. The user has been notified.`)
      }
      setShowCounterOffer(null)
    }
  }

  const cancelCounterOffer = () => {
    setShowCounterOffer(null)
  }

  return (
    <main>
      <Navbar isLoggedIn={true} />

      <div className="max-w-6xl mx-auto p-4">
        {/* Notification Banner */}
        {showNotificationBanner && (
          <div className="fixed top-20 right-4 w-80 bg-[#00FF00] text-black p-4 rounded shadow-lg z-50 animate-fade-in">
            <div className="flex items-start">
              <Bell size={20} className="mr-2 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">Notification Sent</p>
                <p className="text-sm mt-1">{notificationMessage}</p>
              </div>
              <button onClick={() => setShowNotificationBanner(false)} className="text-black hover:text-gray-800">
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-normal my-8 md:my-12">viewing requests</h1>

        {requests.length === 0 ? (
          <div className="text-center py-12 border">
            <p className="text-xl mb-4">You don't have any viewing requests at the moment.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {requests.map((request, index) => (
              <div
                key={request.id}
                className="border p-6 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Property Image */}
                  <div className="w-full md:w-64 h-48 relative">
                    <Image
                      src={request.property.image || "/placeholder.svg"}
                      alt={request.property.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Request Details */}
                  <div className="flex-grow">
                    <h2 className="text-2xl mb-2">{request.property.title}</h2>
                    <p className="mb-4">{request.property.address}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold mb-2">Viewing Details</h3>
                        <p className="flex items-center mb-1">
                          <Calendar size={16} className="mr-2 text-gray-500" />
                          {request.requestedDate}
                        </p>
                        <p className="flex items-center">
                          <Clock size={16} className="mr-2 text-gray-500" />
                          {request.requestedTime}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Requester Information</h3>
                        <p className="flex items-center mb-1">
                          <User size={16} className="mr-2 text-gray-500" />
                          {request.user.name}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">Email: {request.user.email}</p>
                        <p className="text-sm text-gray-600">Phone: {request.user.phone}</p>
                        <p className="text-sm mt-1">
                          ID Verification:{" "}
                          <span
                            className={
                              request.user.verificationStatus === "verified" ? "text-green-600" : "text-orange-500"
                            }
                          >
                            {request.user.verificationStatus}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    {request.status !== "pending" && (
                      <div className="mt-4">
                        <span
                          className={`inline-block px-3 py-1 text-sm ${
                            request.status === "accepted"
                              ? "bg-green-100 text-green-800"
                              : request.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {request.status === "accepted"
                            ? "Accepted"
                            : request.status === "rejected"
                              ? "Rejected"
                              : "Counter Offered"}
                        </span>
                        {request.status === "counter-offered" && request.counterOffer && (
                          <p className="text-sm mt-1">
                            Counter offer: {request.counterOffer.date} at {request.counterOffer.time}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {request.status === "pending" && (
                    <div className="flex flex-col gap-2 min-w-[120px]">
                      <button
                        onClick={() => handleAccept(request.id)}
                        className="flex items-center justify-center bg-[#00FF00] text-black px-4 py-2 hover:bg-opacity-90 transition-colors"
                      >
                        <Check size={16} className="mr-2" />
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="flex items-center justify-center border border-red-600 text-red-600 px-4 py-2 hover:bg-red-50 transition-colors"
                      >
                        <X size={16} className="mr-2" />
                        Reject
                      </button>
                      <button
                        onClick={() => openCounterOffer(request.id, request.requestedDate, request.requestedTime)}
                        className="flex items-center justify-center border px-4 py-2 hover:bg-gray-100 transition-colors"
                      >
                        <MessageSquare size={16} className="mr-2" />
                        Counter Offer
                      </button>
                    </div>
                  )}
                </div>

                {/* Counter Offer Form */}
                {showCounterOffer === request.id && (
                  <div className="mt-4 p-4 border border-blue-200 bg-blue-50 animate-fade-in">
                    <h3 className="font-semibold mb-3">Suggest Alternative Time</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="counterDate" className="block mb-1 text-sm">
                          Alternative Date
                        </label>
                        <input
                          type="date"
                          id="counterDate"
                          value={counterOfferDate}
                          onChange={(e) => setCounterOfferDate(e.target.value)}
                          className="w-full"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="counterTime" className="block mb-1 text-sm">
                          Alternative Time
                        </label>
                        <input
                          type="time"
                          id="counterTime"
                          value={counterOfferTime}
                          onChange={(e) => setCounterOfferTime(e.target.value)}
                          className="w-full"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => sendCounterOffer(request.id)}
                        className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition-colors"
                      >
                        Send Counter Offer
                      </button>
                      <button
                        onClick={cancelCounterOffer}
                        className="border px-4 py-2 hover:bg-gray-100 transition-colors"
                      >
                        Cancel
                      </button>
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
