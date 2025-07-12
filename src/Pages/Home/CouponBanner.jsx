import { motion } from "framer-motion";
import { FiCopy, FiGift } from "react-icons/fi";
import { toast } from "react-hot-toast";

const CouponBanner = () => {
  // Sample coupon data
  const coupons = [
    {
      id: 1,
      code: "WELCOME20",
      discount: "20% OFF",
      description: "First month rent discount",
      expiry: "2023-12-31",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 2,
      code: "SUMMER15",
      discount: "15% OFF",
      description: "Summer special discount",
      expiry: "2023-09-30",
      color: "from-amber-500 to-orange-500",
    },
    {
      id: 3,
      code: "FRIEND10",
      discount: "10% OFF",
      description: "Refer a friend discount",
      expiry: "2023-11-15",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(`Copied: ${code}`, {
      icon: <FiCopy className="text-blue-500" />,
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <section className="pt-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-base-200 to-base-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3 flex items-center justify-center gap-3">
            <FiGift className="text-4xl text-accent" />
            <span>Exclusive Offers</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Special discounts for our valued residents
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coupons.map((coupon) => (
            <motion.div
              key={coupon.id}
              whileHover={{ y: -5 }}
              className="relative overflow-hidden rounded-2xl shadow-xl"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${coupon.color} opacity-90`}
              ></div>

              <div className="relative z-10 p-6 text-white">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-full">
                    Limited Time
                  </span>
                  <span className="text-xs">
                    Expires: {new Date(coupon.expiry).toLocaleDateString()}
                  </span>
                </div>

                <div className="text-center mb-6">
                  <p className="text-sm opacity-80 mb-1">
                    {coupon.description}
                  </p>
                  <p className="text-4xl font-bold mb-2">{coupon.discount}</p>
                </div>

                <div className="bg-black/20 rounded-lg p-3 flex items-center justify-between">
                  <span className="font-mono text-lg tracking-wider">
                    {coupon.code}
                  </span>
                  <button
                    onClick={() => copyToClipboard(coupon.code)}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all hover:cursor-pointer"
                    aria-label="Copy coupon code"
                  >
                    <FiCopy />
                  </button>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
              <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-text-secondary">
            * Terms and conditions apply. Offers valid for limited period only.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CouponBanner;
