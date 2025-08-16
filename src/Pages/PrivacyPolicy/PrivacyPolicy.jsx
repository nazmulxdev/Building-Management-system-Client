import { useState } from "react";
const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("privacy");

  const sections = [
    { id: "privacy", title: "Privacy Policy" },
    { id: "terms", title: "Terms of Service" },
    { id: "cookies", title: "Cookie Policy" },
    { id: "disclaimer", title: "Disclaimer" },
  ];

  return (
    <>
      <div className="min-h-screen bg-base-200">
        {/* Policy Header */}
        <header className="bg-primary text-primary-content py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold sm:text-5xl mb-4">
              Our Policies
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Transparency and trust are fundamental to our building management
              services
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-screen-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <aside className="lg:w-1/4">
              <div className="bg-base-100 rounded-xl shadow-sm sticky top-24">
                <div className="p-6 border-b border-base-300">
                  <h2 className="text-xl font-bold ">Policy Documents</h2>
                </div>
                <nav className="p-4">
                  <ul className="space-y-2">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <button
                          onClick={() => setActiveSection(section.id)}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                            activeSection === section.id
                              ? "bg-primary/10 text-primary font-medium"
                              : "hover:bg-base-300 "
                          }`}
                        >
                          {section.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            {/* Policy Content */}
            <div className="lg:w-3/4">
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                {/* Privacy Policy */}
                {activeSection === "privacy" && (
                  <div className="p-6 sm:p-8">
                    <h2 className="text-2xl font-bold  mb-6">Privacy Policy</h2>
                    <div className="prose max-w-none ">
                      <p className="text-lg text-text-secondary mb-6">
                        Last updated:{" "}
                        {new Date().toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>

                      <section className="mb-8">
                        <h3 className="text-xl font-semibold  mb-4">
                          1. Information We Collect
                        </h3>
                        <p>
                          We collect information to provide better services to
                          all our building tenants and visitors. The types of
                          information we collect include:
                        </p>
                        <ul className="list-disc pl-6 mt-3 space-y-2">
                          <li>
                            <strong>Personal Information:</strong> Name, email
                            address, phone number when you register for building
                            services
                          </li>
                          <li>
                            <strong>Usage Data:</strong> How you interact with
                            our building systems and website
                          </li>
                          <li>
                            <strong>Device Information:</strong> IP address,
                            browser type, and operating system for security
                            purposes
                          </li>
                          <li>
                            <strong>Building Access Data:</strong> Entry/exit
                            times when using keycard or biometric systems
                          </li>
                        </ul>
                      </section>

                      <section className="mb-8">
                        <h3 className="text-xl font-semibold  mb-4">
                          2. How We Use Your Information
                        </h3>
                        <p>
                          We use the information we collect for the following
                          purposes:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="bg-base-200 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">
                              Building Operations
                            </h4>
                            <p className="text-sm">
                              To manage access control, maintenance requests,
                              and tenant communications
                            </p>
                          </div>
                          <div className="bg-base-200 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Security</h4>
                            <p className="text-sm">
                              To monitor building security and investigate
                              potential incidents
                            </p>
                          </div>
                          <div className="bg-base-200 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Improvements</h4>
                            <p className="text-sm">
                              To enhance our building services and tenant
                              experience
                            </p>
                          </div>
                          <div className="bg-base-200 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">
                              Legal Compliance
                            </h4>
                            <p className="text-sm">
                              To meet regulatory requirements and building codes
                            </p>
                          </div>
                        </div>
                      </section>

                      <section className="mb-8">
                        <h3 className="text-xl font-semibold  mb-4">
                          3. Data Sharing & Disclosure
                        </h3>
                        <p>
                          We do not sell your personal information. We may share
                          information with:
                        </p>
                        <ul className="list-disc pl-6 mt-3 space-y-2">
                          <li>
                            Building management staff and authorized personnel
                          </li>
                          <li>
                            Service providers (maintenance, security, IT
                            support) under confidentiality agreements
                          </li>
                          <li>
                            Law enforcement when required by law or to protect
                            vital interests
                          </li>
                        </ul>
                      </section>

                      <section className="mb-8">
                        <h3 className="text-xl font-semibold  mb-4">
                          4. Your Rights
                        </h3>
                        <p>
                          As a building tenant or visitor, you have the right
                          to:
                        </p>
                        <div className="mt-4 space-y-3">
                          <div className="flex items-start">
                            <div className="bg-primary/10 text-primary p-1 rounded-full mr-3 mt-1">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <span>
                              Access the personal data we hold about you
                            </span>
                          </div>
                          <div className="flex items-start">
                            <div className="bg-primary/10 text-primary p-1 rounded-full mr-3 mt-1">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <span>
                              Request correction of inaccurate information
                            </span>
                          </div>
                          <div className="flex items-start">
                            <div className="bg-primary/10 text-primary p-1 rounded-full mr-3 mt-1">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <span>
                              Request deletion of your data where applicable
                            </span>
                          </div>
                          <div className="flex items-start">
                            <div className="bg-primary/10 text-primary p-1 rounded-full mr-3 mt-1">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <span>Object to certain processing activities</span>
                          </div>
                        </div>
                        <p className="mt-4">
                          To exercise these rights, please contact our Data
                          Protection Officer at{" "}
                          <span className="text-primary">
                            dpo@buildingmanagement.com
                          </span>
                          .
                        </p>
                      </section>

                      <section>
                        <h3 className="text-xl font-semibold  mb-4">
                          5. Changes to This Policy
                        </h3>
                        <p>
                          We may update this Privacy Policy periodically. We'll
                          notify tenants of significant changes through building
                          announcements and our website.
                        </p>
                      </section>
                    </div>
                  </div>
                )}

                {/* Terms of Service */}
                {activeSection === "terms" && (
                  <div className="p-6 sm:p-8">
                    <h2 className="text-2xl font-bold  mb-6">
                      Terms of Service
                    </h2>
                    <div className="prose max-w-none ">
                      <p className="text-lg text-text-secondary mb-6">
                        Effective:{" "}
                        {new Date().toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>

                      <section className="mb-8">
                        <h3 className="text-xl font-semibold  mb-4">
                          1. Acceptance of Terms
                        </h3>
                        <p>
                          By accessing or using the services provided by
                          [Building Name] ("we", "us", or "our"), you agree to
                          be bound by these Terms of Service. These terms apply
                          to all visitors, tenants, and users of our building
                          management services.
                        </p>
                      </section>

                      <section className="mb-8">
                        <h3 className="text-xl font-semibold  mb-4">
                          2. Building Access & Usage
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="bg-primary/10 text-primary p-1 rounded-full mr-3 mt-1 flex-shrink-0">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <p>
                              Access credentials (keycards, fobs, etc.) are
                              non-transferable and must not be shared
                            </p>
                          </div>
                          <div className="flex items-start">
                            <div className="bg-primary/10 text-primary p-1 rounded-full mr-3 mt-1 flex-shrink-0">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <p>
                              Tenants are responsible for all activities
                              conducted under their access credentials
                            </p>
                          </div>
                          <div className="flex items-start">
                            <div className="bg-primary/10 text-primary p-1 rounded-full mr-3 mt-1 flex-shrink-0">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <p>
                              Common areas must be left in the same condition as
                              found
                            </p>
                          </div>
                        </div>
                      </section>

                      <section className="mb-8">
                        <h3 className="text-xl font-semibold  mb-4">
                          3. Tenant Responsibilities
                        </h3>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>
                            Comply with all building rules and regulations
                          </li>
                          <li>Report maintenance issues promptly</li>
                          <li>Ensure guests follow building policies</li>
                          <li>
                            Use facilities in a safe and appropriate manner
                          </li>
                          <li>
                            Not engage in activities that may disturb other
                            tenants
                          </li>
                        </ul>
                      </section>

                      <section className="mb-8">
                        <h3 className="text-xl font-semibold  mb-4">
                          4. Prohibited Activities
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-error/5 p-4 rounded-lg border border-error/20">
                            <h4 className="font-medium text-error mb-2">
                              Safety Violations
                            </h4>
                            <ul className="list-disc pl-5 text-sm space-y-1">
                              <li>Tampering with safety equipment</li>
                              <li>Blocking fire exits</li>
                              <li>Unauthorized modifications</li>
                            </ul>
                          </div>
                          <div className="bg-error/5 p-4 rounded-lg border border-error/20">
                            <h4 className="font-medium text-error mb-2">
                              Nuisance
                            </h4>
                            <ul className="list-disc pl-5 text-sm space-y-1">
                              <li>Excessive noise</li>
                              <li>Improper waste disposal</li>
                              <li>Offensive behavior</li>
                            </ul>
                          </div>
                        </div>
                      </section>

                      <section className="mb-8">
                        <h3 className="text-xl font-semibold  mb-4">
                          5. Termination of Access
                        </h3>
                        <p>
                          We reserve the right to suspend or terminate access to
                          building services for violations of these terms.
                          Notice will be provided except in cases of immediate
                          safety concerns.
                        </p>
                      </section>
                    </div>
                  </div>
                )}

                {activeSection === "cookies" && (
                  <div className="p-6 sm:p-8">
                    <h2 className="text-2xl font-bold  mb-6">Cookie Policy</h2>
                    <div className="prose max-w-none ">
                      <p className="text-lg text-text-secondary mb-6">
                        Last updated:{" "}
                        {new Date().toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>

                      <section className="mb-8">
                        <h3 className="text-xl font-semibold  mb-4">
                          1. What Are Cookies
                        </h3>
                        <p>
                          Cookies are small text files stored on your device
                          when you visit our website. They help us provide and
                          improve our building management services.
                        </p>
                      </section>

                      <section className="mb-8">
                        <h3 className="text-xl font-semibold  mb-4">
                          2. How We Use Cookies
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="table w-full">
                            <thead>
                              <tr>
                                <th>Cookie Type</th>
                                <th>Purpose</th>
                                <th>Duration</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Essential</td>
                                <td>
                                  Authentication, security, and core
                                  functionality
                                </td>
                                <td>Session</td>
                              </tr>
                              <tr>
                                <td>Preferences</td>
                                <td>
                                  Remember settings like language preferences
                                </td>
                                <td>1 Year</td>
                              </tr>
                              <tr>
                                <td>Analytics</td>
                                <td>Understand how tenants use our services</td>
                                <td>2 Years</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </section>

                      <section className="mb-8">
                        <h3 className="text-xl font-semibold  mb-4">
                          3. Managing Cookies
                        </h3>
                        <p>
                          You can control cookies through your browser settings.
                          However, disabling essential cookies may affect
                          building portal functionality.
                        </p>
                        <div className="mt-4 bg-base-200 rounded-lg p-4">
                          <h4 className="font-medium mb-2">
                            Browser Controls:
                          </h4>
                          <ul className="list-disc pl-6 space-y-1">
                            <li>
                              <strong>Chrome:</strong> Settings → Privacy and
                              security → Cookies
                            </li>
                            <li>
                              <strong>Safari:</strong> Preferences → Privacy →
                              Cookies
                            </li>
                            <li>
                              <strong>Firefox:</strong> Options → Privacy &
                              Security → Cookies
                            </li>
                          </ul>
                        </div>
                      </section>
                    </div>
                  </div>
                )}

                {activeSection === "disclaimer" && (
                  <div className="p-6 sm:p-8">
                    <h2 className="text-2xl font-bold  mb-6">
                      Legal Disclaimer
                    </h2>
                    <div className="prose max-w-none ">
                      <p className="text-lg text-text-secondary mb-6">
                        Effective:{" "}
                        {new Date().toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>

                      <section className="mb-8">
                        <h3 className="text-xl font-semibold  mb-4">
                          1. No Warranties
                        </h3>
                        <p>
                          The information provided through our building
                          management services is for general informational
                          purposes only. We make no warranties about the
                          completeness, reliability, or accuracy of this
                          information.
                        </p>
                      </section>

                      <section className="mb-8">
                        <h3 className="text-xl font-semibold  mb-4">
                          2. Limitation of Liability
                        </h3>
                        <div className="bg-warning/5 border-l-4 border-warning p-4 mb-4">
                          <p>
                            [Building Name] shall not be liable for any
                            indirect, incidental, special, consequential or
                            punitive damages resulting from use of our services
                            or facilities.
                          </p>
                        </div>
                        <p>
                          Our liability is limited to the maximum extent
                          permitted by applicable law.
                        </p>
                      </section>

                      <section className="mb-8">
                        <h3 className="text-xl font-semibold  mb-4">
                          3. Third-Party Services
                        </h3>
                        <p>
                          Our building portal may contain links to third-party
                          services. We have no control over and assume no
                          responsibility for their content or practices.
                        </p>
                      </section>

                      <section className="mb-8">
                        <h3 className="text-xl font-semibold  mb-4">
                          4. Emergency Situations
                        </h3>
                        <div className="bg-error/5 p-4 rounded-lg">
                          <p>
                            In emergency situations, building management
                            reserves the right to take all necessary actions to
                            ensure safety, which may temporarily override
                            certain policies or terms.
                          </p>
                        </div>
                      </section>

                      <section>
                        <h3 className="text-xl font-semibold  mb-4">
                          5. Governing Law
                        </h3>
                        <p>
                          These terms shall be governed by and construed in
                          accordance with the laws of [State/Country], without
                          regard to its conflict of law provisions.
                        </p>
                      </section>
                    </div>
                  </div>
                )}
                {/* Other sections would follow the same pattern */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PrivacyPolicy;
