import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function BackButton() {
  return (
    <Link href="/" className="flex items-center space-x-1 py-4">
      <ArrowLeft size={16} />
      <span>back to home</span>
    </Link>
  )
}
