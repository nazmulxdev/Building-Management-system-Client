import useRole from "../../Hooks/useRole";
import LoadingSpinner from "../../Utilities/LoadingSpinner";
import AboutBuilding from "./AboutBuilding";
import HomeBanner from "./HomeBanner";
const Home = () => {
  // const axiosSecure = useAxiosSecure();
  const { role, roleLoading } = useRole();
  if (roleLoading) {
    return <LoadingSpinner isLoading={true}></LoadingSpinner>;
  }
  console.log(role);

  return (
    <div>
      <HomeBanner></HomeBanner>
      <AboutBuilding></AboutBuilding>
    </div>
  );
};

export default Home;
