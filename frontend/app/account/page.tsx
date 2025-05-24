import { Navbar } from "@/components/navbar"

export default function AccountPage() {
  return (
    <main>
      <Navbar isLoggedIn={true} />

      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-5xl font-normal my-12">account settings</h1>

        <div className="space-y-8">
          <div className="border p-6">
            <h2 className="text-xl mb-4">personal information</h2>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block">
                    first name
                  </label>
                  <input type="text" id="firstName" name="firstName" defaultValue="John" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="lastName" className="block">
                    last name
                  </label>
                  <input type="text" id="lastName" name="lastName" defaultValue="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block">
                  email
                </label>
                <input type="email" id="email" name="email" defaultValue="john.doe@example.com" />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="block">
                  phone
                </label>
                <input type="tel" id="phone" name="phone" defaultValue="(555) 123-4567" />
              </div>

              <button type="submit" className="bg-black text-white px-6 py-2">
                save changes
              </button>
            </form>
          </div>

          <div className="border p-6">
            <h2 className="text-xl mb-4">change password</h2>

            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="currentPassword" className="block">
                  current password
                </label>
                <input type="password" id="currentPassword" name="currentPassword" />
              </div>

              <div className="space-y-2">
                <label htmlFor="newPassword" className="block">
                  new password
                </label>
                <input type="password" id="newPassword" name="newPassword" />
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block">
                  confirm new password
                </label>
                <input type="password" id="confirmPassword" name="confirmPassword" />
              </div>

              <button type="submit" className="bg-black text-white px-6 py-2">
                update password
              </button>
            </form>
          </div>

          <div className="border p-6">
            <h2 className="text-xl mb-4">ID verification</h2>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600">✓ Verified</p>
                <p className="text-sm text-gray-500 mt-1">Your ID has been verified</p>
              </div>

              <button className="border px-4 py-2">update ID</button>
            </div>
          </div>

          <div className="border p-6">
            <h2 className="text-xl mb-4">notification preferences</h2>

            <form className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  name="emailNotifications"
                  defaultChecked
                  className="mr-2 h-5 w-5"
                  defaultChecked
                  className="mr-2 h-5 w-5"
                />
                <label htmlFor="emailNotifications">Email notifications for booking confirmations and reminders</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="smsNotifications"
                  name="smsNotifications"
                  defaultChecked
                  className="mr-2 h-5 w-5"
                />
                <label htmlFor="smsNotifications">SMS notifications for access codes and important updates</label>
              </div>

              <button type="submit" className="bg-black text-white px-6 py-2">
                save preferences
              </button>
            </form>
          </div>

          <button className="w-full border border-red-500 text-red-500 py-3">delete account</button>
        </div>
      </div>
    </main>
  )
}
