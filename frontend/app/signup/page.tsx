import { BackButton } from "@/components/back-button"

export default function SignupPage() {
  return (
    <div className="max-w-md mx-auto p-4">
      <BackButton />

      <div className="border p-10 mt-8">
        <h1 className="text-4xl text-center mb-10">create account</h1>

        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="firstName" className="block">
              first name
            </label>
            <input type="text" id="firstName" name="firstName" required />
          </div>

          <div className="space-y-2">
            <label htmlFor="lastName" className="block">
              last name
            </label>
            <input type="text" id="lastName" name="lastName" required />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block">
              email
            </label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block">
              password
            </label>
            <input type="password" id="password" name="password" required />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block">
              confirm password
            </label>
            <input type="password" id="confirmPassword" name="confirmPassword" required />
          </div>

          <button type="submit" className="w-full bg-black text-white">
            register
          </button>
        </form>
      </div>
    </div>
  )
}
