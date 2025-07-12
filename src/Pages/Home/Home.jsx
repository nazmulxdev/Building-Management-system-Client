import { useEffect } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useRole from "../../Hooks/useRole";
import LoadingSpinner from "../../Utilities/LoadingSpinner";
const Home = () => {
  // const axiosSecure = useAxiosSecure();
  const { role, roleLoading } = useRole();
  if (roleLoading) {
    return <LoadingSpinner isLoading={true}></LoadingSpinner>;
  }
  console.log(role);

  return (
    <div>
      <p className="font-bold text-accent">
        this is home page of the root layout
      </p>
    </div>
  );
};

export default Home;
