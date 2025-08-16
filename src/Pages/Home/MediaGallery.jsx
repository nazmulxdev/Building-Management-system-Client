import { useState } from "react";

const MediaGallery = () => {
  const [activeTab, setActiveTab] = useState("gallery");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeTour, setActiveTour] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  // Sample media data
  const galleryImages = [
    {
      id: 1,
      src: "https://d5w81cmzih.ufs.sh/f/yvGKoHGefVPn5l9pVTJyB0OQDM2PiJbUyrR4SVzWZHfLxYAE",
      alt: "Building lobby",
      category: "common",
    },
    {
      id: 2,
      src: "https://d5w81cmzih.ufs.sh/f/yvGKoHGefVPniUkV2ywdI8aWyHeMJNUu4EpoB7wcK6Pt1fLx",
      alt: "Office space",
      category: "office",
    },
    {
      id: 3,
      src: "https://d5w81cmzih.ufs.sh/f/yvGKoHGefVPncQJMUA0DQiVleJ2kMLc6X3hqYGOpKrjoFdvP",
      alt: "Conference room",
      category: "common",
    },
    {
      id: 4,
      src: "https://d5w81cmzih.ufs.sh/f/yvGKoHGefVPnebhcgLlvTqROo1atKrgB2D8Nw9cFVUfELC0h",
      alt: "Apartment interior",
      category: "residential",
    },
    {
      id: 5,
      src: "https://d5w81cmzih.ufs.sh/f/yvGKoHGefVPnhSfVaIoK2eOTRD4iMEmhBSyvxtH9UNpswkJn",
      alt: "Building facade",
      category: "exterior",
    },
    {
      id: 6,
      src: "https://d5w81cmzih.ufs.sh/f/yvGKoHGefVPnyvXvhbSefVPnwLgIA2WJtipzs9Eeq6ZomHFx",
      alt: "Amenities area",
      category: "common",
    },
  ];

  const virtualTours = [
    {
      id: 1,
      thumbnail:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3",
      title: "Lobby Virtual Tour",
      embed: (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/BKstJ9NIIvc?si=gkgi70sh7yznP3Ew"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      ),
    },
    {
      id: 2,
      thumbnail:
        "https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-4.0.3",
      title: "Office Space Walkthrough",
      embed: (
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/IxRVa1DbSAg?si=NoYFuvLdY88qTo1C"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      ),
    },
  ];

  const openLightbox = (index) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-base-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">
            Explore Our Spaces
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">
            Experience our building through immersive virtual tours and
            high-quality photography
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="tabs tabs-boxed bg-base-200">
            <button
              className={`tab ${activeTab === "gallery" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("gallery")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Photo Gallery
            </button>
            <button
              className={`tab ${activeTab === "tours" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("tours")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Virtual Tours
            </button>
          </div>
        </div>

        {/* Gallery Content */}
        {activeTab === "gallery" && (
          <div className="mb-12">
            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-base-100 font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {image.alt}
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 bg-primary text-primary-content px-2 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Virtual Tours Content */}
        {activeTab === "tours" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {virtualTours.map((tour) => (
              <div
                key={tour.id}
                className="bg-base-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {activeTour === tour.id ? (
                  <div className="relative pt-[56.25%]">
                    <div className="absolute inset-0">{tour.embed}</div>
                  </div>
                ) : (
                  <>
                    <div
                      className="relative pt-[56.25%] cursor-pointer"
                      onClick={() => setActiveTour(tour.id)}
                    >
                      <img
                        src={tour.thumbnail}
                        alt=""
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-neutral/30 flex items-center justify-center">
                        <div className="btn btn-circle btn-primary btn-lg">
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
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-neutral mb-2">
                        {tour.title}
                      </h3>
                      <button
                        className="btn btn-primary btn-sm mt-2"
                        onClick={() => setActiveTour(tour.id)}
                      >
                        Start Tour
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center bg-primary/5 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-primary mb-4">
            Schedule an In-Person Tour
          </h3>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Experience our spaces firsthand with a guided tour from our leasing
            team
          </p>

          <a className="btn btn-primary" href="#contact">
            {" "}
            Contact Our Team
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </a>
        </div>

        {/* Lightbox Modal */}
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral/90 p-4">
            <button
              className="absolute top-4 right-4 text-base-100 hover:text-primary z-10"
              onClick={() => setLightboxOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="relative w-full max-w-6xl">
              <img
                src={galleryImages[currentImage].src}
                alt={galleryImages[currentImage].alt}
                className="w-full max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-neutral/70 text-base-100 p-4">
                <p>{galleryImages[currentImage].alt}</p>
              </div>
            </div>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-base-100 hover:text-primary z-10"
              onClick={() =>
                setCurrentImage((prev) =>
                  prev === 0 ? galleryImages.length - 1 : prev - 1,
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-base-100 hover:text-primary z-10"
              onClick={() =>
                setCurrentImage((prev) =>
                  prev === galleryImages.length - 1 ? 0 : prev + 1,
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MediaGallery;
