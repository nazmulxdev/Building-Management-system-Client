import { Outlet } from "react-router";
import WebLogo from "../Shared/WebLogo";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import buildingAnimation from "../assets/login.json";
import { useEffect, useState } from "react";
import WhiteWebLogo from "../Shared/WhiteWebLogo";

const AuthLayout = () => {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const greetings = [
    "Welcome to BuildMate!",
    "Streamline Your Building",
    "Smart Management",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/95 to-primary/20 flex items-center justify-center p-4 overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-10 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, #004d40 0%, transparent 20%)",
            "radial-gradient(circle at 80% 70%, #f8d474 0%, transparent 20%)",
            "radial-gradient(circle at 50% 20%, #004d40 0%, transparent 20%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Fixed Greeting Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
        className="hidden lg:flex flex-col items-center justify-center w-1/2 max-w-2xl p-12 relative z-10"
      >
        <div className="w-full max-w-md">
          <div className="flex items-start mb-2">
            <WhiteWebLogo></WhiteWebLogo>
          </div>

          <motion.h1
            key={currentGreeting}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold text-primary-content mb-6 leading-tight"
          >
            {greetings[currentGreeting]}
          </motion.h1>

          <p className="text-xl text-primary-content/80 mb-4">
            The ultimate solution for modern building administration
          </p>

          <div className="h-64">
            <Lottie
              animationData={buildingAnimation}
              loop={true}
              className="drop-shadow-lg"
            />
          </div>

          <div className="flex gap-4 mt-20">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-primary-content/10 p-4 rounded-xl backdrop-blur-sm"
              >
                <div className="text-2xl">{["📊", "🔐", "💸"][i - 1]}</div>
                <p className="text-sm mt-2 text-primary-content">
                  {
                    ["Real-time Analytics", "Secure Access", "Easy Payments"][
                      i - 1
                    ]
                  }
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Dynamic Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="w-full lg:w-1/2 max-w-lg px-4 relative z-10"
      >
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="card bg-base-100/90 backdrop-blur-sm shadow-2xl border border-base-300/20"
        >
          <div className="card-body p-10">
            <div className="lg:hidden  text-center">
              <WebLogo className="w-40 h-auto mx-auto" />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Outlet />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="mt-6 text-center text-sm text-primary-content/70"
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
        >
          Trusted by 500+ building managers worldwide
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
