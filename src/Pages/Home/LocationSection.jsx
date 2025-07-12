import {
  FaMapMarkerAlt,
  FaSubway,
  FaBus,
  FaCar,
  FaWalking,
} from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const LocationSection = () => {
  // Building location coordinates
  const buildingLocation = [23.8103, 90.4125];
  const zoomLevel = 15;
  const address = "123 Luxury Tower Road, Gulshan 2, Dhaka 1212, Bangladesh";

  // Transportation options
  const transportOptions = [
    {
      icon: <FaSubway className="text-2xl text-primary" />,
      title: "Metro",
      description: "5 min walk from Motijheel Metro Station (Line 6)",
    },
    {
      icon: <FaBus className="text-2xl text-primary" />,
      title: "Bus",
      description: "Routes 101, 203, 305 stop at our front entrance",
    },
    {
      icon: <FaCar className="text-2xl text-primary" />,
      title: "Car",
      description: "Parking available for residents and visitors",
    },
    {
      icon: <FaWalking className="text-2xl text-primary" />,
      title: "Walk",
      description: "10 min from Gulshan 2 circle",
    },
  ];

  // Function to open directions in Google Maps
  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${buildingLocation[0]},${buildingLocation[1]}`;
    window.open(url, "_blank");
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-base-100">
      <div className="max-w-screen-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3 flex items-center justify-center gap-2">
            <FaMapMarkerAlt className="text-accent" />
            <span>Our Location</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Conveniently situated in the heart of the city with multiple
            transportation options
          </p>
        </div>

        {/*start Map and Details section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* map section */}
          <div className="h-96 lg:h-full min-h-[400px] rounded-xl overflow-hidden shadow-xl border-2 border-base-300 z-0">
            <MapContainer
              center={buildingLocation}
              zoom={zoomLevel}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={buildingLocation}>
                <Popup>
                  <div className="font-bold text-primary">The Haven Towers</div>
                  <div className="text-sm">{address}</div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* Location Details section */}
          <div className="flex flex-col h-full">
            <div className="bg-base-200 p-6 rounded-xl shadow-sm mb-6 flex-grow">
              <h3 className="text-xl font-bold mb-4 text-primary">Address</h3>
              <p className="mb-2">123 Luxury Tower Road</p>
              <p className="mb-2">Gulshan 2, Dhaka 1212</p>
              <p className="mb-4">Bangladesh</p>
              <button
                onClick={handleGetDirections}
                className="btn btn-primary btn-sm"
              >
                Get Directions
              </button>
            </div>

            {/* Transportation Options section */}
            <div className="flex-grow">
              <h3 className="text-xl font-bold mb-4 text-primary">
                How to Get Here
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {transportOptions.map((option, index) => (
                  <div
                    key={index}
                    className="bg-base-200 p-4 rounded-lg flex items-start gap-3 h-full"
                  >
                    <div className="mt-1">{option.icon}</div>
                    <div>
                      <h4 className="font-bold">{option.title}</h4>
                      <p className="text-sm text-text-secondary">
                        {option.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Nearby Attractions section */}
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-6 text-primary text-center">
            Nearby Attractions
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Gulshan Park (800m)",
              "Bashundhara Mall (1.2km)",
              "Dhaka Club (1.5km)",
              "Lake View (600m)",
            ].map((attraction, index) => (
              <span
                key={index}
                className="badge badge-lg badge-outline border-primary text-primary"
              >
                {attraction}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
