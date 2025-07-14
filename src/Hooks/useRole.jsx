import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { currentUser, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const email = currentUser?.email;
  const {
    data,
    isPending: isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    enabled: !authLoading && !!email,
    queryKey: ["userRole", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/users/role/${email}`);
      return res.data;
    },
  });
  return {
    data,
    roleLoading: authLoading || isLoading,
    isError,
    error,
    refetch,
  };
};

export default useRole;
