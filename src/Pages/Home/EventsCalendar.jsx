import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EventsCalendar = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showFullCalendar, setShowFullCalendar] = useState(false);

  const eventCategories = ["All", "Social", "Maintenance", "Safety"];

  const events = [
    {
      id: 1,
      date: "15 Oct",
      title: "Fire Safety Drill",
      time: "10:00 AM",
      location: "Main Lobby",
      category: "Safety",
      description:
        "Mandatory annual fire safety drill for all tenants. Please follow staff instructions.",
      image:
        "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=500",
    },
    {
      id: 2,
      date: "20 Oct",
      title: "Tenant Mixer",
      time: "6:00 PM - 8:00 PM",
      location: "Rooftop Terrace",
      category: "Social",
      description:
        "Networking event with complimentary drinks and hors d'oeuvres. RSVP required.",
      image:
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500",
    },
    {
      id: 3,
      date: "25 Oct",
      title: "HVAC Maintenance",
      time: "8:00 AM - 12:00 PM",
      location: "All Floors",
      category: "Maintenance",
      description:
        "Quarterly HVAC system maintenance. Brief interruptions to air conditioning possible.",
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500",
    },
    {
      id: 4,
      date: "28 Oct",
      title: "Building Yoga Session",
      time: "7:00 AM",
      location: "Courtyard",
      category: "Social",
      description:
        "Free yoga session for all tenants. Mats provided. All levels welcome.",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=500",
    },
  ];

  const filteredEvents =
    activeFilter === "All"
      ? events
      : events.filter((event) => event.category === activeFilter);

  const toggleCalendarView = () => {
    setShowFullCalendar(!showFullCalendar);
  };

  return (
    <section className="py-16 bg-base-200 mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-primary sm:text-4xl"
          >
            Building Events
          </motion.h2>
          <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">
            Upcoming activities and maintenance schedules
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {eventCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === category
                  ? "bg-primary text-primary-content shadow-md"
                  : "bg-base-100 btn  btn-outline"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="bg-base-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-neutral/90 to-transparent p-4">
                    <div className="flex items-center">
                      <div className="bg-primary text-primary-content p-2 rounded-lg mr-3">
                        <span className="font-bold block leading-none">
                          {event.date.split(" ")[0]}
                        </span>
                        <span className="text-xs block">
                          {event.date.split(" ")[1]}
                        </span>
                      </div>
                      <h3 className="font-bold text-base-100">{event.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center text-sm text-text-secondary mb-3">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {event.time}
                    <span className="mx-2">•</span>
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
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
                    {event.location}
                  </div>
                  <p className="text-text-secondary mb-4">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Full Calendar Modal */}
        <AnimatePresence>
          {showFullCalendar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-neutral/90 flex items-center justify-center p-4"
              onClick={() => setShowFullCalendar(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative bg-base-100 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowFullCalendar(false)}
                  className="absolute top-4 right-4 btn btn-circle btn-primary"
                >
                  ✕
                </button>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-6">
                    Full Event Calendar
                  </h3>
                  {/* Calendar implementation would go here */}
                  <motion.div className="relative bg-base-100 rounded-xl w-full max-w-5xl h-[80vh]">
                    <iframe
                      src={`https://calendar.google.com/calendar/embed?src=${encodeURIComponent(
                        "your_calendar_id@group.calendar.google.com",
                      )}&ctz=UTC`}
                      className="w-full h-full border-0 rounded-xl"
                      frameBorder="0"
                      scrolling="no"
                    ></iframe>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleCalendarView}
            className="btn btn-primary px-8 py-3 text-lg"
          >
            {showFullCalendar ? "Close Calendar" : "View Full Calendar"}
            <svg
              className={`w-5 h-5 ml-2 transition-transform ${
                showFullCalendar ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default EventsCalendar;
