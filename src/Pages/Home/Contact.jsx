import React from "react";
import Swal from "sweetalert2";

const Contact = () => {
  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-base-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">
                Get in Touch
              </h2>
              <p className="mt-4 text-lg text-text-secondary">
                Our team is here to answer your questions about the property,
                availability, or any other inquiries.
              </p>
            </div>

            <div className="space-y-6">
              {/* Contact Method 1 */}
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-primary">Phone</h3>
                  <p className="mt-1 text-text-secondary">
                    Main: (555) 123-4567
                  </p>
                  <p className="text-text-secondary">Leasing: (555) 765-4321</p>
                </div>
              </div>

              {/* Contact Method 2 */}
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-secondary/10 p-3 rounded-lg text-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-secondary">Email</h3>
                  <p className="mt-1 text-text-secondary">
                    General: info@buildingname.com
                  </p>
                  <p className="text-text-secondary">
                    Leasing: leasing@buildingname.com
                  </p>
                </div>
              </div>

              {/* Contact Method 3 */}
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-accent/10 p-3 rounded-lg text-accent">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-accent">
                    Office Hours
                  </h3>
                  <p className="mt-1 text-text-secondary">
                    Monday - Friday: 9am - 6pm
                  </p>
                  <p className="text-text-secondary">Saturday: 10am - 4pm</p>
                  <p className="text-text-secondary">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-error/10 p-4 rounded-lg border-l-4 border-error">
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-error"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="ml-2 text-sm font-medium text-error">
                  Emergency Contact
                </h3>
              </div>
              <div className="mt-2 text-sm text-error">
                <p>
                  For after-hours emergencies, please call:{" "}
                  <span className="font-semibold">(555) 987-6543</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Inquiry Form */}
          <div className="bg-base-200 rounded-xl shadow-sm p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-primary mb-6">
              Send Us a Message
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                Swal.fire({
                  icon: "warning",
                  title: "Sorry...",
                  text: "Currently we are working on this. Please, try again later",
                }).then(() => {
                  e.target.reset();
                });
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium  mb-1"
                  >
                    First Name
                  </label>
                  <input
                    required
                    type="text"
                    id="first-name"
                    className="input input-bordered w-full bg-base-100 focus:ring-primary focus:border-primary"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    id="last-name"
                    className="input input-bordered w-full bg-base-100 focus:ring-primary focus:border-primary"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium  mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="input input-bordered w-full bg-base-100 focus:ring-primary focus:border-primary"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  className="input input-bordered w-full bg-base-100 focus:ring-primary focus:border-primary"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-1"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  required
                  className="select select-bordered w-full bg-base-100 focus:ring-primary focus:border-primary"
                >
                  <option>General Inquiry</option>
                  <option>Leasing Information</option>
                  <option>Maintenance Request</option>
                  <option>Billing Question</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="textarea textarea-bordered w-full bg-base-100 focus:ring-primary focus:border-primary"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <div className="flex items-center">
                <input
                  id="agree-terms"
                  type="checkbox"
                  required
                  className="checkbox checkbox-primary h-4 w-4 rounded"
                />
                <label
                  htmlFor="agree-terms"
                  className="ml-2 block text-sm text-text-secondary"
                >
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:underline">
                    privacy policy
                  </a>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="btn btn-primary w-full py-3 px-4 text-base font-medium rounded-lg shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
