import { Navbar } from "@/components/navbar"

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-5xl font-normal my-12 text-center">about us</h1>

        <div className="space-y-6">
          <p>
            Welcome to Property Direct, the innovative platform revolutionizing the way people view and rent properties.
            We've eliminated the traditional broker model to create a more efficient, transparent, and cost-effective
            experience for both property owners and renters.
          </p>

          <h2 className="text-2xl mt-8">our mission</h2>
          <p>
            Our mission is to simplify the property viewing process by connecting renters directly with properties. By
            removing intermediaries, we save you time and money while maintaining the highest standards of security and
            convenience.
          </p>

          <h2 className="text-2xl mt-8">how it works</h2>
          <div className="space-y-4 mt-4">
            <div className="border p-4">
              <h3 className="font-semibold">1. Browse and Select</h3>
              <p>Browse our extensive collection of properties and select the ones you'd like to view in person.</p>
            </div>

            <div className="border p-4">
              <h3 className="font-semibold">2. Book a Viewing</h3>
              <p>Choose a convenient date and time for your viewing directly through our platform.</p>
            </div>

            <div className="border p-4">
              <h3 className="font-semibold">3. Verify Your Identity</h3>
              <p>
                For security purposes, upload a photo of your ID. This ensures the safety of our property owners and
                their assets.
              </p>
            </div>

            <div className="border p-4">
              <h3 className="font-semibold">4. Receive Access Code</h3>
              <p>
                Shortly before your scheduled viewing, you'll receive a unique access code to the property's lockbox.
              </p>
            </div>

            <div className="border p-4">
              <h3 className="font-semibold">5. View at Your Pace</h3>
              <p>
                Use the access code to retrieve the key and view the property at your own pace, without any sales
                pressure.
              </p>
            </div>
          </div>

          <h2 className="text-2xl mt-8">our commitment to security</h2>
          <p>
            Security is our top priority. We implement rigorous ID verification processes, secure lockbox systems, and
            comprehensive property monitoring to ensure safety for all parties involved. All viewings are tracked and
            recorded for security purposes.
          </p>

          <h2 className="text-2xl mt-8">for property owners</h2>
          <p>
            Property owners benefit from our streamlined system by reaching qualified renters directly, reducing vacancy
            periods, and eliminating broker fees. Our platform handles the scheduling, verification, and access
            management, giving you peace of mind while maximizing your property's exposure.
          </p>
        </div>
      </div>
    </main>
  )
}
