import { Navbar } from "@/components/navbar"
import Image from "next/image"
import { Calendar, Clock, Check, Bell } from "lucide-react"

// Mock data for bookings
const bookings = [
  {
    id: 1,
    property: {
      id: 1,
      title: "luxury penthouse",
      address: "123 skyline avenue, new york",
      image: "/placeholder.svg?height=200&width=300",
    },
    date: "july 15, 2023",
    time: "2:00 PM",
    status: "confirmed",
    isHighlighted: true, // First booking is highlighted with green button
    accessCode: "A12B34",
    hasNewNotification: false,
  },
  {
    id: 2,
    property: {
      id: 2,
      title: "beachfront villa",
      address: "456 ocean drive, malibu",
      image: "/placeholder.svg?height=200&width=300",
    },
    date: "july 18, 2023",
    time: "11:00 AM",
    status: "pending",
    isHighlighted: false,
    hasNewNotification: false,
  },
  {
    id: 3,
    property: {
      id: 3,
      title: "mountain retreat",
      address: "789 pine road, aspen",
      image: "/placeholder.svg?height=200&width=300",
    },
    date: "july 22, 2023",
    time: "3:30 PM",
    status: "counter-offered",
    counterOffer: {
      date: "july 23, 2023",
      time: "1:00 PM",
    },
    isHighlighted: false,
    hasNewNotification: true,
  },
]

export default function MyBookingsPage() {
  return (
    <main>
      <Navbar isLoggedIn={true} />

      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-5xl font-normal my-12">my bookings</h1>

        <div className="space-y-6">
          {bookings.map((booking, index) => (
            <div
              key={booking.id}
              className="border p-6 flex flex-col md:flex-row gap-6 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-full md:w-64 h-48 relative">
                <Image
                  src={booking.property.image || "/placeholder.svg"}
                  alt={booking.property.title}
                  fill
                  className="object-cover"
                />
                {booking.hasNewNotification && (
                  <div className="absolute top-2 right-2 bg-[#00FF00] text-black rounded-full p-1">
                    <Bell size={16} />
                  </div>
                )}
              </div>

              <div className="flex-grow">
                <h2 className="text-2xl mb-2">{booking.property.title}</h2>
                <p className="mb-2">{booking.property.address}</p>

                <div className="flex items-center mb-2">
                  <Calendar size={16} className="mr-2 text-gray-500" />
                  <span>date: {booking.date}</span>
                </div>

                <div className="flex items-center mb-4">
                  <Clock size={16} className="mr-2 text-gray-500" />
                  <span>time: {booking.time}</span>
                </div>

                {/* Status Information */}
                {booking.status === "confirmed" && (
                  <div className="bg-green-50 border border-green-200 p-3 mb-2">
                    <p className="flex items-center text-green-700 font-medium mb-1">
                      <Check size={16} className="mr-2" />
                      Viewing Confirmed
                    </p>
                    <p className="text-sm text-gray-700">Your viewing has been confirmed. Please arrive on time.</p>
                    {booking.accessCode && (
                      <div className="mt-2">
                        <p className="text-sm font-medium">Access Code:</p>
                        <p className="bg-white border border-green-300 px-3 py-1 inline-block font-mono font-medium text-lg mt-1">
                          {booking.accessCode}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {booking.status === "pending" && (
                  <div className="bg-gray-50 border border-gray-200 p-3 mb-2">
                    <p className="text-gray-700 font-medium">Awaiting Confirmation</p>
                    <p className="text-sm text-gray-600 mt-1">The property owner will review your request shortly.</p>
                  </div>
                )}

                {booking.status === "counter-offered" && booking.counterOffer && (
                  <div className="bg-blue-50 border border-blue-200 p-3 mb-2">
                    <p className="flex items-center text-blue-700 font-medium mb-1">
                      <Calendar size={16} className="mr-2" />
                      Alternative Time Offered
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      The property owner has suggested an alternative time for your viewing:
                    </p>
                    <p className="font-medium">
                      {booking.counterOffer.date} at {booking.counterOffer.time}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <button className="bg-blue-600 text-white px-4 py-1 text-sm hover:bg-blue-700 transition-colors">
                        Accept New Time
                      </button>
                      <button className="border border-gray-300 px-4 py-1 text-sm hover:bg-gray-100 transition-colors">
                        Decline
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col md:flex-row gap-2 md:items-start">
                {booking.isHighlighted ? (
                  <button className="px-6 py-3 bg-[#00FF00] text-black transition-colors">reschedule</button>
                ) : (
                  <button className="px-6 py-3 bg-black text-white flex items-center justify-center">pending</button>
                )}
                <button className="bg-black text-white px-6 py-3 transition-colors hover:bg-gray-800">cancel</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
