import { motion, AnimatePresence } from "framer-motion";
import { FiCopy, FiGift, FiClock, FiCheck } from "react-icons/fi";
import { toast } from "react-hot-toast";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Utilities/LoadingSpinner";
import { useState } from "react";

const CouponBanner = () => {
  const axiosInstance = useAxios();
  const [copiedId, setCopiedId] = useState(null);

  const {
    data: coupons = [],
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["valid-coupons"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/valid-coupons");
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    toast.success(`Copied: ${code}`, {
      icon: <FiCopy className="text-blue-500" />,
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getGridColumnsClass = (count) => {
    if (count === 1) return "grid-cols-1 max-w-md mx-auto";
    if (count === 2) return "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  };

  // Animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <LoadingSpinner isLoading={isLoading}>
      <section className="pt-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto">
          {error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="alert alert-error max-w-md mx-auto shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Error loading coupons: {error.message}</span>
            </motion.div>
          ) : coupons.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3 flex items-center justify-center gap-3">
                <FiGift className="text-4xl text-accent" />
                <span>Current Offers</span>
              </h2>
              <div className="bg-base-100 rounded-xl p-8 max-w-2xl mx-auto shadow-sm border border-base-300">
                <p className="text-lg text-text-secondary">
                  No active coupons available at the moment.
                </p>
                <p className="text-sm text-text-secondary mt-2">
                  Check back later for special offers!
                </p>
              </div>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                className="text-center mb-10"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3 flex items-center justify-center gap-3">
                  <FiGift className="text-4xl text-accent animate-pulse" />
                  <span>Exclusive Offers</span>
                </h2>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                  Special discounts for our valued residents. Limited time only!
                </p>
              </motion.div>

              {isFetching ? (
                <div className="flex justify-center py-8">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
              ) : (
                <div className={`flex justify-center`}>
                  <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                    className={`grid ${getGridColumnsClass(
                      coupons.length,
                    )} gap-6 w-full`}
                  >
                    <AnimatePresence>
                      {coupons.map((coupon) => {
                        const daysLeft = Math.ceil(
                          (new Date(coupon.expiry) - new Date()) /
                            (1000 * 60 * 60 * 24),
                        );
                        const isExpiringSoon = daysLeft <= 7;

                        return (
                          <motion.div
                            key={coupon._id || coupon.id}
                            variants={item}
                            whileHover={{ y: -8, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
                          >
                            <div
                              className={`absolute inset-0 ${coupon.color} opacity-90`}
                            ></div>

                            {isExpiringSoon && (
                              <div className="absolute top-4 left-4 z-20">
                                <span className="badge badge-warning gap-1 animate-pulse">
                                  <FiClock size={14} /> Expiring soon!
                                </span>
                              </div>
                            )}

                            <div className="relative z-10 p-6 text-white h-full flex flex-col">
                              <div className="flex justify-between items-start mb-4">
                                <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-full">
                                  Limited Time
                                </span>
                                <span className="text-xs flex items-center gap-1">
                                  <FiClock size={12} />
                                  Expires:{" "}
                                  {new Date(coupon.expiry).toLocaleDateString()}
                                </span>
                              </div>

                              <div className="text-center mb-6 flex-grow flex flex-col justify-center">
                                <p className="text-sm opacity-80 mb-1">
                                  {coupon.description}
                                </p>
                                <motion.p
                                  className="text-4xl font-bold mb-2"
                                  initial={{ scale: 0.9 }}
                                  animate={{ scale: 1 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 15,
                                  }}
                                >
                                  {coupon.discount}%
                                </motion.p>
                                <p className="text-xs opacity-70">
                                  {daysLeft > 0
                                    ? `${daysLeft} day${
                                        daysLeft !== 1 ? "s" : ""
                                      } remaining`
                                    : "Last day!"}
                                </p>
                              </div>

                              <div className="bg-black/20 rounded-lg p-3 flex items-center justify-between">
                                <span className="font-mono text-lg tracking-wider">
                                  {coupon.code}
                                </span>
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      coupon.code,
                                      coupon._id || coupon.id,
                                    )
                                  }
                                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all hover:cursor-pointer relative"
                                  aria-label="Copy coupon code"
                                >
                                  <AnimatePresence mode="wait">
                                    {copiedId === (coupon._id || coupon.id) ? (
                                      <motion.span
                                        key="check"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="absolute inset-0 flex items-center justify-center"
                                      >
                                        <FiCheck className="text-green-400" />
                                      </motion.span>
                                    ) : (
                                      <motion.span
                                        key="copy"
                                        initial={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="flex items-center justify-center"
                                      >
                                        <FiCopy />
                                      </motion.span>
                                    )}
                                  </AnimatePresence>
                                </button>
                              </div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
                            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </motion.div>
                </div>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center mt-8"
              >
                <p className="text-sm text-text-secondary">
                  * Terms and conditions apply. Offers valid for limited period
                  only.
                </p>
              </motion.div>
            </>
          )}
        </div>
      </section>
    </LoadingSpinner>
  );
};

export default CouponBanner;
