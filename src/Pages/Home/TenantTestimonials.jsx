import Marquee from "react-fast-marquee";

const TenantTestimonials = () => {
  const logos = [
    "https://logo.clearbit.com/netflix.com",
    "https://logo.clearbit.com/tesla.com",
    "https://logo.clearbit.com/samsung.com",
    "https://logo.clearbit.com/sony.com",
    "https://logo.clearbit.com/nike.com",
    "https://logo.clearbit.com/adidas.com",
    "https://logo.clearbit.com/coca-cola.com",
    "https://logo.clearbit.com/pepsi.com",
    "https://logo.clearbit.com/starbucks.com",
    "https://logo.clearbit.com/mcdonalds.com",
  ];
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-base-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">
            What Our Tenants Say!!
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">
            Hear from businesses and residents who call our building home
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-base-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="avatar">
                <div className="w-12 h-12 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Sarah Johnson"
                  />
                </div>
              </div>
              <div className="ml-4">
                <h4 className="font-bold ">Sarah Johnson</h4>
                <p className="text-sm text-text-secondary">Tech Startup CEO</p>
              </div>
            </div>
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <blockquote>
              <p className="italic">
                "The building management is incredibly responsive. We've been
                here for 3 years and couldn't imagine a better location for our
                business. The amenities are top-notch!"
              </p>
            </blockquote>
            <div className="mt-4 flex items-center text-sm text-text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Tenant since 2020</span>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-base-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="avatar">
                <div className="w-12 h-12 rounded-full ring-2 ring-secondary ring-offset-base-100 ring-offset-2">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Michael Chen"
                  />
                </div>
              </div>
              <div className="ml-4">
                <h4 className="font-bold ">Michael Chen</h4>
                <p className="text-sm text-text-secondary">
                  Residential Tenant
                </p>
              </div>
            </div>
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <blockquote>
              <p className="italic">
                "Living here has been wonderful. The building staff know us by
                name and always go above and beyond. The location can't be beat
                - everything I need is within walking distance."
              </p>
            </blockquote>
            <div className="mt-4 flex items-center text-sm text-text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Tenant since 2019</span>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-base-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="avatar">
                <div className="w-12 h-12 rounded-full ring-2 ring-accent ring-offset-base-100 ring-offset-2">
                  <img
                    src="https://randomuser.me/api/portraits/women/68.jpg"
                    alt="Jessica Williams"
                  />
                </div>
              </div>
              <div className="ml-4">
                <h4 className="font-bold ">Jessica Williams</h4>
                <p className="text-sm text-text-secondary">Law Firm Partner</p>
              </div>
            </div>
            <div className="flex mb-2">
              {[...Array(4)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <svg
                className="w-5 h-5 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <blockquote>
              <p className="italic">
                "Our clients are always impressed when they visit our offices
                here. The building maintains its prestige while offering modern
                conveniences. The security team provides excellent peace of
                mind."
              </p>
            </blockquote>
            <div className="mt-4 flex items-center text-sm text-text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Tenant since 2021</span>
            </div>
          </div>
        </div>

        {/* Company Logos */}
        <div className="mt-16">
          <h3 className="text-center text-lg font-bold text-accent mb-8">
            Trusted by leading organizations
          </h3>

          <div className="py-6">
            <Marquee
              pauseOnHover={true}
              speed={40}
              gradient={false}
              className="overflow-visible"
            >
              {logos.map((logo, index) => (
                <div
                  key={index}
                  className="p-4 mx-2 bg-base-100 rounded-lg flex items-center justify-center h-20 w-40 transition-all duration-300 group"
                >
                  <div className="relative w-full h-full">
                    {/* Main Logo */}
                    <img
                      src={logo}
                      alt="Company logo"
                      className="absolute inset-0 h-full w-full object-contain opacity-80  transition-opacity duration-300"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/150?text=Company+Logo";
                      }}
                    />
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TenantTestimonials;
