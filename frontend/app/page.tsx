import { Navbar } from "@/components/navbar"
import { Search } from "@/components/search"
import { PropertyGrid } from "@/components/property-grid"

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4">
        <Search />
        <PropertyGrid />
      </div>
    </main>
  )
}
