"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Calendar, Upload, Check, ChevronDown } from "lucide-react"

interface BookingFormProps {
  propertyId: string
}

export function BookingForm({ propertyId }: BookingFormProps) {
  const [step, setStep] = useState(1)
  const [date, setDate] = useState("")
  const [hour, setHour] = useState("")
  const [minute, setMinute] = useState("00")
  const [amPm, setAmPm] = useState("AM")
  const [idUploaded, setIdUploaded] = useState(false)
  const [showHourDropdown, setShowHourDropdown] = useState(false)
  const [showMinuteDropdown, setShowMinuteDropdown] = useState(false)
  const dateInputRef = useRef<HTMLInputElement>(null)
  const calendarIconRef = useRef<HTMLDivElement>(null)

  // Format the time for display and submission
  const formattedTime = hour && minute ? `${hour}:${minute} ${amPm}` : ""

  // Fix for calendar not showing up
  useEffect(() => {
    const handleCalendarClick = () => {
      if (dateInputRef.current) {
        // Focus the input first
        dateInputRef.current.focus()
        // Use a small timeout to ensure focus is applied before showing the picker
        setTimeout(() => {
          try {
            // @ts-ignore - showPicker is not in the standard TypeScript definitions but works in modern browsers
            dateInputRef.current?.showPicker?.()
          } catch (error) {
            console.log("Browser doesn't support showPicker method")
          }
        }, 100)
      }
    }

    const calendarIcon = calendarIconRef.current
    if (calendarIcon) {
      calendarIcon.addEventListener("click", handleCalendarClick)
    }

    return () => {
      if (calendarIcon) {
        calendarIcon.removeEventListener("click", handleCalendarClick)
      }
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      // Here you would handle the ID verification
      // For now, we'll just simulate it
      setIdUploaded(true)
      setStep(3)
    } else {
      // Final submission would go to your backend
      alert("Booking submitted! You will receive the access code before your viewing.")
    }
  }

  return (
    <div className="border p-4 md:p-8 mb-8 md:mb-12 animate-fade-in">
      <h2 className="text-xl md:text-2xl mb-4 md:mb-6">schedule a viewing</h2>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-4 md:space-y-6 animate-slide-in">
            <div className="space-y-2">
              <label htmlFor="date" className="block">
                select date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="date"
                  ref={dateInputRef}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full"
                />
                <div
                  ref={calendarIconRef}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                >
                  <Calendar size={20} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="time" className="block">
                select time
              </label>
              <div className="flex space-x-2">
                {/* Hour dropdown */}
                <div className="relative flex-1">
                  <div
                    className="w-full p-3 border flex justify-between items-center cursor-pointer"
                    onClick={() => {
                      setShowHourDropdown(!showHourDropdown)
                      setShowMinuteDropdown(false)
                    }}
                  >
                    <span>{hour || "Hour"}</span>
                    <ChevronDown size={16} />
                  </div>

                  {showHourDropdown && (
                    <div className="absolute left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border shadow-lg z-10 animate-fade-in">
                      {Array.from({ length: 12 }, (_, i) => {
                        const hourValue = (i + 1).toString().padStart(2, "0")
                        return (
                          <div
                            key={hourValue}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setHour(hourValue)
                              setShowHourDropdown(false)
                            }}
                          >
                            {hourValue}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Minute dropdown */}
                <div className="relative flex-1">
                  <div
                    className="w-full p-3 border flex justify-between items-center cursor-pointer"
                    onClick={() => {
                      setShowMinuteDropdown(!showMinuteDropdown)
                      setShowHourDropdown(false)
                    }}
                  >
                    <span>{minute || "Minute"}</span>
                    <ChevronDown size={16} />
                  </div>

                  {showMinuteDropdown && (
                    <div className="absolute left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border shadow-lg z-10 animate-fade-in">
                      {["00", "15", "30", "45"].map((min) => (
                        <div
                          key={min}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setMinute(min)
                            setShowMinuteDropdown(false)
                          }}
                        >
                          {min}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* AM/PM toggle */}
                <div className="flex border">
                  <button
                    type="button"
                    className={`px-3 py-3 ${amPm === "AM" ? "bg-[#00FF00]" : ""}`}
                    onClick={() => setAmPm("AM")}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    className={`px-3 py-3 border-l ${amPm === "PM" ? "bg-[#00FF00]" : ""}`}
                    onClick={() => setAmPm("PM")}
                  >
                    PM
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#00FF00] text-black hover:bg-opacity-90 transition-colors"
              disabled={!date || !hour || !minute}
            >
              continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 md:space-y-6 animate-slide-in">
            <p>For security purposes, please upload a photo of your ID.</p>
            <p className="text-sm text-gray-500">
              This is required to access the property. Your ID will be verified and securely stored.
            </p>

            <div className="border-2 border-dashed border-gray-300 p-4 md:p-8 text-center">
              <p className="mb-4">Drag and drop your ID photo here, or click to select a file</p>
              <input
                type="file"
                id="idPhoto"
                className="hidden"
                accept="image/*"
                onChange={() => setIdUploaded(true)}
              />
              <button
                type="button"
                onClick={() => document.getElementById("idPhoto")?.click()}
                className="bg-gray-100 px-4 py-2 hover:bg-gray-200 transition-colors"
              >
                <Upload size={16} className="inline mr-2" />
                Select File
              </button>
            </div>

            <button
              type="submit"
              className={`w-full ${idUploaded ? "bg-[#00FF00] text-black" : "bg-gray-300 text-gray-700"} transition-colors`}
              disabled={!idUploaded}
            >
              verify ID
            </button>

            <button
              type="button"
              className="w-full border hover:bg-gray-100 transition-colors"
              onClick={() => setStep(1)}
            >
              back
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 md:space-y-6 animate-slide-in">
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="font-semibold flex items-center">
                <Check size={18} className="text-[#00FF00] mr-2" />
                booking summary
              </h3>
              <p>Date: {date}</p>
              <p>Time: {formattedTime}</p>
              <p>ID Verification: Complete</p>
            </div>

            <p>
              Upon confirmation, you will receive an email with details about your viewing. A unique access code will be
              sent to you 15 minutes before your scheduled time, which you can use to access the lockbox containing the
              property key.
            </p>

            <button type="submit" className="w-full bg-[#00FF00] text-black hover:bg-opacity-90 transition-colors">
              confirm booking
            </button>

            <button
              type="button"
              className="w-full border hover:bg-gray-100 transition-colors"
              onClick={() => setStep(2)}
            >
              back
            </button>
          </div>
        )}
      </form>
    </div>
  )
}
