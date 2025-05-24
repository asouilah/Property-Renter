"use client"
import { Navbar } from "@/components/navbar"
import { PropertyListingForm } from "@/components/property-listing-form"

export default function ListPropertyPage() {
  return (
    <main>
      <Navbar isLoggedIn={true} />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-4xl md:text-5xl font-normal my-8 md:my-12 text-center">list your property</h1>
        <p className="text-center mb-8 md:mb-12">
          Complete the form below to list your property on our platform. The more details you provide, the better chance
          you have of attracting potential renters or buyers.
        </p>

        <PropertyListingForm />
      </div>
    </main>
  )
}
