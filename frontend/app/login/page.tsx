import Link from "next/link"
import { BackButton } from "@/components/back-button"
import { Eye } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto p-4">
      <BackButton />

      <div className="border p-10 mt-8 animate-fade-in">
        <h1 className="text-4xl text-center mb-10">login</h1>

        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block">
              email
            </label>
            <div className="relative">
              <input type="email" id="email" name="email" required className="border-[#00FF00]" />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Eye className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block">
              password
            </label>
            <input type="password" id="password" name="password" required />
          </div>

          <button type="submit" className="w-full bg-black text-white hover:bg-gray-800 transition-colors">
            log in
          </button>

          <div className="text-center space-y-2">
            <p>
              don't have an account?{" "}
              <Link href="/signup" className="hover:underline">
                sign up
              </Link>
            </p>
            <p>
              <Link href="/forgot-password" className="hover:underline">
                forgot password?
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
