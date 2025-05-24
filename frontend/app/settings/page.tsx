import { Navbar } from "@/components/navbar"

export default function SettingsPage() {
  return (
    <main>
      <Navbar isLoggedIn={true} />

      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-5xl font-normal my-12">settings</h1>

        <div className="space-y-8 animate-fade-in">
          <div className="border p-6">
            <h2 className="text-xl mb-4">account settings</h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Email notifications</h3>
                  <p className="text-sm text-gray-500">Receive email updates about your bookings</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00FF00]"></div>
                </label>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">SMS notifications</h3>
                  <p className="text-sm text-gray-500">Receive text messages for access codes</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00FF00]"></div>
                </label>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Marketing emails</h3>
                  <p className="text-sm text-gray-500">Receive updates about new properties</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00FF00]"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="border p-6">
            <h2 className="text-xl mb-4">privacy settings</h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Profile visibility</h3>
                  <p className="text-sm text-gray-500">Allow property owners to see your profile</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00FF00]"></div>
                </label>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Data sharing</h3>
                  <p className="text-sm text-gray-500">Share anonymous usage data to improve our service</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00FF00]"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="border p-6">
            <h2 className="text-xl mb-4">appearance</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Theme</h3>
                <div className="flex gap-4">
                  <button className="px-4 py-2 border border-[#00FF00] bg-white">Light</button>
                  <button className="px-4 py-2 border">Dark</button>
                  <button className="px-4 py-2 border">System</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
