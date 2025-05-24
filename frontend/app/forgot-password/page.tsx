import Link from "next/link"
import { BackButton } from "@/components/back-button"

export default function ForgotPasswordPage() {
  return (
    <div className="max-w-md mx-auto p-4">
      <BackButton />

      <div className="border p-10 mt-8">
        <h1 className="text-4xl text-center mb-10">forgot password</h1>

        <form className="space-y-6">
          <p className="text-center">Enter your email address and we'll send you a link to reset your password.</p>

          <div className="space-y-2">
            <label htmlFor="email" className="block">
              email
            </label>
            <input type="email" id="email" name="email" required />
          </div>

          <button type="submit" className="w-full bg-black text-white">
            send reset link
          </button>

          <div className="text-center">
            <Link href="/login" className="hover:underline">
              back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
