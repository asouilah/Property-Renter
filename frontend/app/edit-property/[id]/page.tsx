"use client"

import { Navbar } from "@/components/navbar"
import { PropertyListingForm } from "@/components/property-listing-form"

export default function EditPropertyPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <Navbar isLoggedIn={true} />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-4xl md:text-5xl font-normal my-8 md:my-12 text-center">edit property</h1>
        <p className="text-center mb-8 md:mb-12">
          Update your property listing information below. All changes will be reviewed before being published.
        </p>

        <PropertyListingForm />
      </div>
    </main>
  )
}
