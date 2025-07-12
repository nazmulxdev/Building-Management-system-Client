import { motion } from "framer-motion";
import {
  FaBuilding,
  FaParking,
  FaSwimmingPool,
  FaWifi,
  FaTree,
  FaShieldAlt,
  FaLayerGroup,
  FaHome,
  FaCity,
} from "react-icons/fa";
import { FaStairs } from "react-icons/fa6";

const AboutBuilding = () => {
  // Building details data
  const buildingDetails = {
    name: "The Haven Towers",
    yearBuilt: 2023,
    architect: "Studio Modern Architects",
    description:
      "A 30-floor architectural marvel housing 240 luxury apartments across 4 blocks. Our building combines sustainable design with premium urban living.",
    structure: [
      { icon: <FaLayerGroup />, label: "Floors", value: "30" },
      { icon: <FaCity />, label: "Blocks", value: "4" },
      { icon: <FaHome />, label: "Apartments", value: "240" },
      { icon: <FaStairs />, label: "Units per Floor", value: "8" },
    ],
    features: [
      { icon: <FaBuilding />, text: "Contemporary high-rise design" },
      { icon: <FaParking />, text: "Underground parking (2 spaces/unit)" },
      { icon: <FaSwimmingPool />, text: "Infinity rooftop pool" },
      { icon: <FaWifi />, text: "High-speed fiber internet" },
      { icon: <FaTree />, text: "Green spaces & vertical gardens" },
      { icon: <FaShieldAlt />, text: "24/7 security & CCTV" },
    ],
    stats: [
      { value: "98%", label: "Occupancy Rate" },
      { value: "4.9★", label: "Resident Rating" },
      { value: "50+", label: "Amenities" },
      { value: "100%", label: "Power Backup" },
    ],
  };

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-base-100">
      <div className="max-w-screen-2xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-3 md:mb-4">
            About Our Building
          </h2>
          <div className="w-20 md:w-24 h-1 bg-accent mx-auto mb-4 md:mb-6"></div>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto">
            Discover the vision behind {buildingDetails.name}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative h-full min-h-[300px] md:min-h-[400px] rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl"
          >
            <img
              src="https://d5w81cmzih.ufs.sh/f/yvGKoHGefVPnoFMKcr8N1VbXxzreCm0v7nDJ946Oy52PZkWT"
              alt={buildingDetails.name}
              className="w-full h-full object-cover absolute inset-0"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white text-xs md:text-sm">
              <p>Architect: {buildingDetails.architect}</p>
              <p>Completed: {buildingDetails.yearBuilt}</p>
            </div>
          </motion.div>

          {/* Right Column*/}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col h-full"
          >
            <div className="bg-base-100 p-6 md:p-8 rounded-xl shadow-sm h-full flex flex-col">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 text-primary">
                {buildingDetails.name}
              </h3>

              <p className="text-base sm:text-lg mb-6 md:mb-8 leading-relaxed flex-grow">
                {buildingDetails.description}
              </p>

              {/* Building Structure */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 md:mb-8">
                {buildingDetails.structure.map((item, index) => (
                  <div
                    key={index}
                    className="bg-base-200 p-3 rounded-lg text-center"
                  >
                    <div className="text-accent text-xl md:text-2xl mb-1 flex justify-center">
                      {item.icon}
                    </div>
                    <p className="text-sm md:text-base font-medium text-text">
                      {item.value} {item.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10">
                {buildingDetails.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 md:gap-3">
                    <span className="text-accent text-lg md:text-xl mt-0.5">
                      {feature.icon}
                    </span>
                    <span className="text-text text-sm md:text-base">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stats - Pushed to bottom */}
              <div className="mt-auto">
                <div className="flex flex-wrap gap-3 md:gap-4">
                  {buildingDetails.stats.map((stat, index) => (
                    <div
                      key={index}
                      className="text-center px-4 py-2 md:px-6 md:py-3 bg-base-200 rounded-lg flex-1 min-w-[120px]"
                    >
                      <p className="text-xl md:text-2xl font-bold text-primary">
                        {stat.value}
                      </p>
                      <p className="text-xs md:text-sm text-text-secondary">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutBuilding;
