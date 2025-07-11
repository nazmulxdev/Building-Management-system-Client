import { useEffect } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
const Home = () => {
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure.get("/api/apartments").then((data) => {
      console.log(data.data);
    });
  }, [axiosSecure]);
  return (
    <div>
      <p className="font-bold text-accent">
        this is home page of the root layout
      </p>
    </div>
  );
};

export default Home;
