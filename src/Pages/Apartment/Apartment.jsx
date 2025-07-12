import React, { useState } from "react";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Utilities/LoadingSpinner";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaFileSignature,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
} from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Apartment = () => {
  const [activePage, setActivePage] = useState(1);
  const axiosInstance = useAxios();
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [appliedRentRange, setAppliedRentRange] = useState({
    min: null,
    max: null,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["apartments", activePage, appliedRentRange],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/apartments?page=${activePage}&limit=6${
          appliedRentRange.min ? `&minRent=${appliedRentRange.min}` : ""
        }${appliedRentRange.max ? `&maxRent=${appliedRentRange.max}` : ""}`,
      );
      return res.data;
    },
    keepPreviousData: true,
  });
  const handleSearch = () => {
    setAppliedRentRange({
      min: minRent || null,
      max: maxRent || null,
    });
    setActivePage(1); // Reset to first page on new search
  };

  const clearSearch = () => {
    setMinRent("");
    setMaxRent("");
    setAppliedRentRange({ min: null, max: null });
    setActivePage(1);
  };

  return (
    <LoadingSpinner isLoading={isLoading}>
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-base-100">
        <div className="max-w-screen-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
              Available Apartments
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              {data?.apartments?.length
                ? `Showing ${data.apartments.length} of ${data.totalApartments} apartments`
                : "Explore our premium apartments"}
            </p>
          </div>

          {/* rent range search section */}
          <div className="mb-8 p-4 bg-base-200 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Search Apartments by Rent Range
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Min Rent (TK)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={minRent}
                    onChange={(e) => setMinRent(e.target.value)}
                    placeholder="e.g., 1000"
                    className="input input-bordered w-full bg-base-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Max Rent (TK)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={maxRent}
                    onChange={(e) => setMaxRent(e.target.value)}
                    placeholder="e.g., 2000"
                    className="input input-bordered w-full bg-base-100"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSearch}
                  className="btn btn-primary gap-2"
                  disabled={!minRent && !maxRent}
                >
                  <FaSearch /> Search
                </button>
                {(appliedRentRange.min || appliedRentRange.max) && (
                  <button onClick={clearSearch} className="btn btn-ghost">
                    Clear
                  </button>
                )}
              </div>
            </div>
            {(appliedRentRange.min || appliedRentRange.max) && (
              <p className="mt-2 text-sm text-text-secondary">
                Showing apartments with rent:{" "}
                {appliedRentRange.min ? `≥ ${appliedRentRange.min} TK` : ""}
                {appliedRentRange.min && appliedRentRange.max ? " and " : ""}
                {appliedRentRange.max ? `≤ ${appliedRentRange.max} TK` : ""}
              </p>
            )}
          </div>

          {/* Apartment Grid */}
          {data?.apartments?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {data.apartments.map((apartment) => (
                  <motion.div
                    key={apartment._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    className="card bg-base-100 border border-base-300 overflow-hidden shadow-sm hover:shadow-md transition-all"
                  >
                    {/* Card Header with Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={apartment.image}
                        alt={`Apartment ${apartment.apartmentNo}`}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex justify-between items-end text-white">
                          <div>
                            <h3 className="text-xl font-bold drop-shadow-md">
                              {apartment.apartmentNo}
                            </h3>
                            <p className="text-sm drop-shadow-md">
                              Block {apartment.block} • Floor {apartment.floor}
                            </p>
                          </div>
                          <span className="badge badge-lg bg-accent border-accent text-primary">
                            ${apartment.rent}/mo
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5">
                      {/* Status & Details */}
                      <div className="flex justify-between items-start mb-3">
                        <span
                          className={`badge ${
                            apartment.status === "available"
                              ? "bg-primary text-white"
                              : "bg-error text-white"
                          }`}
                        >
                          {apartment.status}
                        </span>
                        <div className="flex gap-3 text-sm text-text-secondary">
                          <span className="flex items-center gap-1">
                            <FaBed className="text-primary" />{" "}
                            {apartment.bedrooms}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaBath className="text-primary" />{" "}
                            {apartment.bathrooms}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaRulerCombined className="text-primary" />{" "}
                            {apartment.size} sqft
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-text mb-4 line-clamp-2 text-sm">
                        {apartment.description}
                      </p>

                      {/* Action Button */}
                      <Link
                        to={`/apartment/${apartment._id}`}
                        className="btn btn-primary btn-sm w-full gap-2 transition-colors"
                      >
                        <FaFileSignature /> Book Naw
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Pagination */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12">
                <div className="text-sm text-text-secondary">
                  Page {activePage} of {data?.totalPages || 1}
                </div>

                <div className="join">
                  <button
                    onClick={() =>
                      setActivePage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={activePage === 1}
                    className="join-item btn btn-sm bg-base-200 border-base-300 hover:bg-base-300 disabled:opacity-50"
                  >
                    <FaChevronLeft />
                  </button>

                  {Array.from({
                    length: Math.min(5, data?.totalPages || 1),
                  }).map((_, idx) => {
                    const pageNum =
                      activePage <= 3
                        ? idx + 1
                        : Math.min(activePage + idx - 2, data?.totalPages || 1);
                    return (
                      <button
                        key={idx}
                        onClick={() => setActivePage(pageNum)}
                        className={`join-item btn btn-sm ${
                          activePage === pageNum
                            ? "bg-primary text-white border-primary"
                            : "bg-base-200 border-base-300"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() =>
                      setActivePage((prev) =>
                        Math.min(prev + 1, data?.totalPages || 1),
                      )
                    }
                    disabled={activePage === data?.totalPages}
                    className="join-item btn btn-sm bg-base-200 border-base-300 hover:bg-base-300 disabled:opacity-50"
                  >
                    <FaChevronRight />
                  </button>
                </div>

                <div className="text-sm text-text-secondary">
                  {data?.totalApartments || 0} apartments total
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-text-secondary">
                No apartments available at the moment
              </p>
            </div>
          )}
        </div>
      </section>
    </LoadingSpinner>
  );
};

export default Apartment;
