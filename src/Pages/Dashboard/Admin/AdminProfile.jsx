import { useEffect, useState } from "react";
import { FiUser, FiMail, FiClock, FiShield } from "react-icons/fi";
import { motion } from "framer-motion";
import useRole from "../../../Hooks/useRole";
import useAuth from "../../../Hooks/useAuth";

const AdminProfile = () => {
  const { data: role, roleLoading } = useRole();
  const { currentUser, loading } = useAuth();
  const [lastLoginTime, setLastLoginTime] = useState("");

  console.log(role, currentUser);

  useEffect(() => {
    if (currentUser?.metadata?.lastSignInTime) {
      const date = new Date(currentUser.metadata.lastSignInTime);
      setLastLoginTime(date.toLocaleString());
    }
  }, [currentUser]);

  useEffect(() => {
    document.title = `Dashboard | ${role?.name}`;
  }, [role]);

  if (loading || roleLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-screen"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
        ></motion.div>
      </motion.div>
    );
  }

  // building management stats
  const buildingStats = [
    {
      title: "Active Buildings",
      value: currentUser?.buildingCount || 12,
      color: "text-primary",
      desc: "Under management",
    },
    {
      title: "Maintenance Tasks",
      value: currentUser?.maintenanceTasks || 28,
      color: "text-secondary",
      desc: "This month",
    },
    {
      title: "Tenants",
      value: currentUser?.tenantCount || 342,
      color: "text-accent",
      desc: "Currently registered",
    },
    {
      title: "System Health",
      value: "98%",
      color: "text-success",
      desc: "All systems operational",
    },
  ];

  // activity feed from building management
  const buildingActivities = [
    {
      action: "Maintenance Scheduled",
      details: "HVAC check for Building A",
      time: lastLoginTime || "2 hours ago",
    },
    {
      action: "New Tenant Added",
      details: "Apartment 4B - Building C",
      time: "Yesterday",
    },
    {
      action: "Payment Processed",
      details: "Building D - Monthly dues",
      time: "2 days ago",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-base-200 p-4 md:p-8"
    >
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <motion.div layout className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="text-3xl font-bold text-primary"
          >
            Building Admin Profile
          </motion.h1>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="card bg-base-100 shadow-xl"
        >
          <div className="card-body">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center">
                <motion.div whileHover={{ scale: 1.03 }} className="avatar">
                  <motion.div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={
                        currentUser?.photoURL ||
                        "https://res.cloudinary.com/duled1hmr/image/upload/v1752842195/My-Home-Users/rraxzdqiugcgytvqmayn.png"
                      }
                      alt="Admin Avatar"
                    />
                  </motion.div>
                </motion.div>
              </div>

              {/* Details Section */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <motion.h2 className="text-2xl font-bold">
                      {currentUser?.displayName || "Building Admin"}
                    </motion.h2>
                    <motion.div className="badge badge-primary gap-2 mt-2">
                      <FiShield /> {role?.name || "Building Administrator"}
                    </motion.div>
                  </div>
                </div>

                {/* Building Admin Details */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {[
                    {
                      icon: <FiMail className="text-primary" />,
                      label: "Email",
                      value: currentUser?.email || "admin@buildmate.com",
                    },
                    {
                      icon: <FiClock className="text-primary" />,
                      label: "Last Login",
                      value: lastLoginTime || "Just now",
                    },
                    {
                      icon: <FiUser className="text-primary" />,
                      label: "Account Created",
                      value: new Date(
                        role?.createdAt || "2025-07-18T12:35:28.367Z",
                      ).toLocaleDateString(),
                    },
                    {
                      icon: <FiShield className="text-primary" />,
                      label: "Admin ID",
                      value: currentUser?.uid || "SY4Drfiv4mUtmYqwgN2R0YDowxQ2",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="p-2 rounded-full bg-base-200">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">
                          {item.label}
                        </p>
                        <p className="font-medium truncate">{item.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Building Management Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {buildingStats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="stats bg-base-200 overflow-hidden"
                >
                  <div className="stat">
                    <div className="stat-title">{stat.title}</div>
                    <motion.div
                      className={`stat-value ${stat.color}`}
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: index * 0.1 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="stat-desc">{stat.desc}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Building Management Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 card bg-base-100 shadow-xl"
        >
          <div className="card-body">
            <h2 className="card-title text-xl font-bold">
              Recent Building Activity
            </h2>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Details</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {buildingActivities.map((item, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ backgroundColor: "rgba(0, 77, 64, 0.05)" }}
                    >
                      <td>{item.action}</td>
                      <td>{item.details}</td>
                      <td>{item.time}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminProfile;
