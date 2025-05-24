import { Navbar } from "@/components/navbar"

export default function ContactPage() {
  return (
    <main>
      <Navbar />

      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-5xl font-normal my-12 text-center">contact us</h1>

        <div className="border p-8">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block">
                email
              </label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="block">
                subject
              </label>
              <select id="subject" name="subject" required className="w-full p-3 border">
                <option value="">Select a subject</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Property Listing">Property Listing</option>
                <option value="Viewing Issue">Viewing Issue</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Feedback">Feedback</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block">
                message
              </label>
              <textarea id="message" name="message" rows={6} required className="w-full p-3 border"></textarea>
            </div>

            <button type="submit" className="w-full bg-black text-white">
              send message
            </button>
          </form>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl mb-4">our office</h2>
            <p>123 Property Lane</p>
            <p>Suite 456</p>
            <p>New York, NY 10001</p>
          </div>

          <div>
            <h2 className="text-xl mb-4">contact information</h2>
            <p>Email: info@propertydirect.com</p>
            <p>Phone: (555) 123-4567</p>
            <p>Hours: Monday-Friday, 9am-6pm EST</p>
          </div>
        </div>
      </div>
    </main>
  )
}
