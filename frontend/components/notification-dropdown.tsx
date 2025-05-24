"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Bell, Calendar, Home, Clock, Check, X, MessageSquare } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

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

// Mock notifications data
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
]

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter((notification) => !notification.read).length

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

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "viewing-accepted":
        return <Check size={16} className="text-green-500" />
      case "viewing-rejected":
        return <X size={16} className="text-red-500" />
      case "viewing-requested":
        return <Calendar size={16} className="text-blue-500" />
      case "counter-offer":
        return <MessageSquare size={16} className="text-orange-500" />
      case "access-code":
        return <Home size={16} className="text-purple-500" />
      case "reminder":
        return <Clock size={16} className="text-yellow-500" />
      default:
        return <Bell size={16} className="text-gray-500" />
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors relative"
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#00FF00] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
        <span className="sr-only">Notifications</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border shadow-lg rounded-sm z-10 animate-fade-in">
          <div className="p-3 border-b flex justify-between items-center">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="text-xs text-blue-600 hover:text-blue-800 transition-colors">
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No notifications</div>
            ) : (
              notifications.map((notification) => (
                <Link
                  key={notification.id}
                  href={notification.link}
                  onClick={() => markAsRead(notification.id)}
                  className={`block p-3 border-b hover:bg-gray-50 transition-colors ${!notification.read ? "bg-gray-50" : ""}`}
                >
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1">
                      <p className={`text-sm ${!notification.read ? "font-semibold" : ""}`}>{notification.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDistanceToNow(notification.date, { addSuffix: true })}
                      </p>
                    </div>
                    {!notification.read && <div className="w-2 h-2 bg-[#00FF00] rounded-full mt-1"></div>}
                  </div>
                </Link>
              ))
            )}
          </div>

          <div className="p-2 border-t text-center">
            <Link
              href="/notifications"
              className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              View all notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
