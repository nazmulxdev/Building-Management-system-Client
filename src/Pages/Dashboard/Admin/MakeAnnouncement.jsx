import { useForm } from "react-hook-form";
import { FaBullhorn, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const MakeAnnouncement = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    document.title = "Dashboard | Make Announcement";
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/api/announcements", data);
      if (res.data.success) {
        Swal.fire({
          position: "center",
          title: "Announcement Published!",
          text: "Your announcement has been successfully sent to all users",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
        reset();
        queryClient.invalidateQueries(["announcements"]);
      }
    } catch (error) {
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Failed to publish announcement",
        "error",
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-screen-2xl mx-auto p-4 md:p-6 bg-gradient-to-br from-base-200 to-base-100 min-h-screen"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-primary/10 rounded-full">
          <FaBullhorn className="text-3xl text-primary" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            Make New Announcement
          </h1>
          <p>Share important updates with all building residents</p>
        </div>
      </div>

      {/* Announcement Form  border border-base-300 */}
      <div className="rounded-xl shadow-md border border-base-300 overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="space-y-6">
            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Announcement Title *
              </label>
              <input
                id="title"
                type="text"
                {...register("title", { required: "Title is required" })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.title ? "border-red-500" : "border-base-300"
                } focus:ring-2 focus:ring-primary focus:border-transparent`}
                placeholder="Enter announcement title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description Field */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-1"
              >
                Announcement Details *
              </label>
              <textarea
                id="description"
                rows={6}
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 20,
                    message: "Description should be at least 20 characters",
                  },
                })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.description ? "border-red-500" : "border-base-300"
                } focus:ring-2 focus:ring-primary focus:border-transparent`}
                placeholder="Provide detailed information about the announcement..."
              ></textarea>
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Preview Section */}
            <div className="bg-base-100 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Announcement Preview</h3>
              <div className="prose max-w-none p-4 bg-base-100 rounded border border-base-300">
                <h4 className="text-lg font-semibold">
                  {watch("title") || "[Your announcement title]"}
                </h4>
                <p className="mt-2">
                  {watch("description") ||
                    "[Your announcement content will appear here]"}
                </p>
                <p className="text-sm mt-4">
                  - Posted by Admin on {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg shadow-md hover:shadow-lg transition-all hover:cursor-pointer"
              >
                <FaPaperPlane />
                <span>Publish Announcement</span>
              </motion.button>
            </div>
          </div>
        </form>
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-base-100 border border-base-300 rounded-lg p-4">
        <h3 className="text-lg font-medium text-primary mb-2">
          Announcement Best Practices
        </h3>
        <ul className="list-disc list-inside space-y-1 text-accent">
          <li>Keep titles clear and concise (under 10 words)</li>
          <li>Include all relevant dates and times</li>
          <li>Highlight important information in bold</li>
          <li>Use bullet points for multiple items</li>
          <li>Always proofread before publishing</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default MakeAnnouncement;
