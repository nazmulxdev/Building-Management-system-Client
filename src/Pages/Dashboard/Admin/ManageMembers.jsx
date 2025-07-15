import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Utilities/LoadingSpinner";
import { FaEnvelope, FaTrashAlt, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all members
  const {
    data: members,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/users/members");
      return res.data;
    },
  });

  // Mutation for removing member status
  const { mutate: removeMember } = useMutation({
    mutationFn: ({ userId, email }) =>
      axiosSecure.patch(`/api/users/remove-member/${userId}`, { email }),
    onSuccess: () => {
      queryClient.invalidateQueries(["members"]);
      Swal.fire({
        position: "top-end",
        title: "Success!",
        text: "Member status removed successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      });
    },
    onError: (error) => {
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Failed to remove member status",
        "error",
      );
    },
  });

  const handleRemoveMember = (userId, userName, email) => {
    Swal.fire({
      title: `Remove ${userName} from members?`,
      text: "They will be downgraded to regular user access",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#004d40",
      confirmButtonText: "Yes, remove",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        removeMember({ userId, email });
      }
    });
  };

  if (isLoading) return <LoadingSpinner isLoading={isLoading} fullScreen />;

  if (isError) {
    return (
      <div className="alert alert-error shadow-lg max-w-md mx-auto mt-8">
        <div>
          <FaTimes className="text-xl" />
          <span>Failed to load members. Please try again later.</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:p-6"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <FaUsers className="text-4xl text-primary" />
            <h1 className="text-3xl font-bold text-primary">Manage Members</h1>
          </div>
          <p className="text-gray-500">View and manage all building members</p>
        </div>
        <div className="badge badge-primary badge-lg gap-2 px-4 py-3">
          <FaUsers className="text-white" />
          {members?.length || 0} Members
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Table Header */}
            <thead className="bg-base-200">
              <tr>
                <th>Member</th>
                <th>Email</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {members?.length ? (
                members.map((member) => (
                  <motion.tr
                    key={member._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="hover:bg-base-100 border-b border-gray-100"
                  >
                    {/* Member Info */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar placeholder">
                          <div className="bg-primary text-white rounded-full w-10">
                            <span>{member.name?.charAt(0) || "M"}</span>
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">{member.name}</div>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td>
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-primary" />
                        <span className="text-sm md:text-base break-all">
                          {member.email}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="flex justify-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            handleRemoveMember(
                              member?._id,
                              member?.name,
                              member?.email,
                            )
                          }
                          className="btn btn-error btn-sm gap-1 text-primary-content"
                        >
                          <FaTrashAlt /> Remove
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-12">
                    <div className="flex flex-col items-center gap-3 text-gray-400">
                      <FaUsers className="text-5xl" />
                      <p className="text-lg">No members found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default ManageMembers;
