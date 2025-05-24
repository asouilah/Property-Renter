import { Navbar } from "@/components/navbar"
import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"

// Mock data for favorite properties
const favorites = [
  {
    id: 1,
    title: "modern penthouse",
    location: "new york",
    price: "$8,500,000",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 3,
    title: "mountain retreat",
    location: "aspen",
    price: "$5,200,000",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 5,
    title: "luxury condo",
    location: "miami",
    price: "$3,900,000",
    image: "/placeholder.svg?height=400&width=400",
  },
]

export default function FavoritesPage() {
  return (
    <main>
      <Navbar isLoggedIn={true} />

      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-5xl font-normal my-12">favorites</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((property, index) => (
            <div
              key={property.id}
              className="border relative animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link href={`/properties/${property.id}`}>
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl">{property.title}</h3>
                  <p className="mt-2">
                    {property.location} • {property.price}
                  </p>
                </div>
              </Link>
              <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                <Heart className="h-5 w-5 fill-[#00FF00] text-[#00FF00]" />
              </button>
            </div>
          ))}
        </div>

        {favorites.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl">You haven't added any properties to your favorites yet.</p>
            <Link href="/properties" className="mt-4 inline-block bg-[#00FF00] px-6 py-3">
              Browse Properties
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
