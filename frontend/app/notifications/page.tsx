"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Bell, Calendar, Home, Clock, Check, X, MessageSquare } from "lucide-react"
import { formatDistanceToNow, format } from "date-fns"

// Define notification types
type NotificationType =
  | "viewing-accepted"
  | "viewing-rejected"
  | "viewing-requested"
  | "counter-offer"
  | "access-code"
  | "reminder"

interface Notification {
  id: number
  type: NotificationType
  title: string
  message: string
  date: Date
  read: boolean
  link: string
  propertyId?: number
  propertyTitle?: string
}

// Mock notifications data - more comprehensive for the full page
const mockNotifications: Notification[] = [
  {
    id: 1,
    type: "viewing-accepted",
    title: "Viewing Accepted",
    message: "Your request to view 'Modern Penthouse' has been accepted",
    date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    link: "/my-bookings",
    propertyId: 1,
    propertyTitle: "Modern Penthouse",
  },
  {
    id: 2,
    type: "viewing-requested",
    title: "New Viewing Request",
    message: "John Smith has requested to view 'Beachfront Villa'",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    link: "/viewing-requests",
    propertyId: 2,
    propertyTitle: "Beachfront Villa",
  },
  {
    id: 3,
    type: "counter-offer",
    title: "Alternative Time Suggested",
    message: "Property owner suggested a different time for 'Downtown Loft'",
    date: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: true,
    link: "/my-bookings",
    propertyId: 4,
    propertyTitle: "Downtown Loft",
  },
  {
    id: 4,
    type: "access-code",
    title: "Access Code Available",
    message: "Your access code for 'Luxury Condo' is now available",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    link: "/my-bookings",
    propertyId: 5,
    propertyTitle: "Luxury Condo",
  },
  {
    id: 5,
    type: "reminder",
    title: "Viewing Reminder",
    message: "Your viewing of 'Mountain Retreat' is scheduled for tomorrow",
    date: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 days ago
    read: true,
    link: "/my-bookings",
    propertyId: 3,
    propertyTitle: "Mountain Retreat",
  },
  {
    id: 6,
    type: "viewing-rejected",
    title: "Viewing Rejected",
    message: "Your request to view 'Historic Mansion' has been rejected",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    read: true,
    link: "/my-bookings",
    propertyId: 6,
    propertyTitle: "Historic Mansion",
  },
  {
    id: 7,
    type: "viewing-requested",
    title: "New Viewing Request",
    message: "Sarah Johnson has requested to view 'Modern Penthouse'",
    date: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    read: true,
    link: "/viewing-requests",
    propertyId: 1,
    propertyTitle: "Modern Penthouse",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [filter, setFilter] = useState<NotificationType | "all">("all")
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "viewing-accepted":
        return <Check size={20} className="text-green-500" />
      case "viewing-rejected":
        return <X size={20} className="text-red-500" />
      case "viewing-requested":
        return <Calendar size={20} className="text-blue-500" />
      case "counter-offer":
        return <MessageSquare size={20} className="text-orange-500" />
      case "access-code":
        return <Home size={20} className="text-purple-500" />
      case "reminder":
        return <Clock size={20} className="text-yellow-500" />
      default:
        return <Bell size={20} className="text-gray-500" />
    }
  }

  const getFilteredNotifications = () => {
    return notifications.filter((notification) => {
      if (showUnreadOnly && notification.read) {
        return false
      }
      if (filter !== "all" && notification.type !== filter) {
        return false
      }
      return true
    })
  }

  const filteredNotifications = getFilteredNotifications()
  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <main>
      <Navbar isLoggedIn={true} />

      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center my-8">
          <h1 className="text-4xl md:text-5xl font-normal">notifications</h1>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="bg-[#00FF00] text-black px-4 py-2 hover:bg-opacity-90 transition-colors"
            >
              Mark all as read
            </button>
          )}
        </div>

        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center">
            <span className="mr-2">Filter:</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as NotificationType | "all")}
              className="border p-2"
            >
              <option value="all">All notifications</option>
              <option value="viewing-accepted">Accepted viewings</option>
              <option value="viewing-rejected">Rejected viewings</option>
              <option value="viewing-requested">Viewing requests</option>
              <option value="counter-offer">Counter offers</option>
              <option value="access-code">Access codes</option>
              <option value="reminder">Reminders</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="unreadOnly"
              checked={showUnreadOnly}
              onChange={() => setShowUnreadOnly(!showUnreadOnly)}
              className="mr-2 h-4 w-4"
            />
            <label htmlFor="unreadOnly">Show unread only</label>
          </div>
        </div>

        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12 border">
            <Bell size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-xl mb-2">No notifications</p>
            <p className="text-gray-500">
              {showUnreadOnly
                ? "You don't have any unread notifications"
                : filter !== "all"
                  ? `You don't have any ${filter.replace("-", " ")} notifications`
                  : "You don't have any notifications yet"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`border p-4 hover:shadow-sm transition-shadow ${!notification.read ? "bg-gray-50" : ""}`}
              >
                <div className="flex">
                  <div className="mr-4">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className={`text-lg ${!notification.read ? "font-semibold" : ""}`}>{notification.title}</h3>
                      <div className="text-sm text-gray-500">
                        {formatDistanceToNow(notification.date, { addSuffix: true })}
                      </div>
                    </div>
                    <p className="text-gray-700 mt-1">{notification.message}</p>
                    <div className="flex justify-between items-center mt-3">
                      <div className="text-sm text-gray-500">{format(notification.date, "MMM d, yyyy • h:mm a")}</div>
                      <div className="flex gap-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            Mark as read
                          </button>
                        )}
                        <a
                          href={notification.link}
                          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          View details
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
