import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const HomeBanner = () => {
  //   banner content
  const banners = [
    {
      id: 1,
      image:
        "https://d5w81cmzih.ufs.sh/f/yvGKoHGefVPnCmVUgJ3zxIGmEpHzT3e0o6Yk8AtKjnLXa7lC",
      title: "Luxury Living Redefined",
      subtitle: "Experience premium amenities and smart home features",
    },
    {
      id: 2,
      image:
        "https://d5w81cmzih.ufs.sh/f/yvGKoHGefVPnpZTLIefsrC3OwM4HbTlQu1YStFza0LAgdKmV",
      title: "Your Dream Residence",
      subtitle: "Spacious layouts with breathtaking views",
    },
    {
      id: 3,
      image:
        "https://d5w81cmzih.ufs.sh/f/yvGKoHGefVPnPv9LOSbGR1E9bqWKCtpxIZ8c5Lf0STlVzasH",
      title: "Smart & Sustainable",
      subtitle: "Eco-friendly design with cutting-edge technology",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Auto-rotate banners every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const goToSlide = (newIndex) => {
    setDirection(newIndex > currentIndex ? 1 : -1);
    setCurrentIndex(newIndex);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <section className="relative h-[70vh] min-h-[400px] w-full overflow-hidden">
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={banners[currentIndex].id}
          custom={direction}
          initial={{ opacity: 0, x: direction * 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -100 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${banners[currentIndex].image})` }}
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
          </div>

          {/* Content Overlay */}
          <div className="relative h-full flex items-center justify-center text-center px-4">
            <div className="max-w-4xl mx-auto text-white">
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg"
              >
                {banners[currentIndex].title}
              </motion.h1>
              <motion.p
                initial={{ y: 70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-2xl mb-8 drop-shadow-md"
              >
                {banners[currentIndex].subtitle}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <button className="btn btn-primary btn-lg rounded-full px-8 text-white hover:bg-accent transition-all">
                  Explore Apartments
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 z-10 transition-all"
        aria-label="Previous slide"
      >
        <FiChevronLeft className="text-2xl text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 z-10 transition-all"
        aria-label="Next slide"
      >
        <FiChevronRight className="text-2xl text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === index ? "bg-white w-6" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeBanner;
