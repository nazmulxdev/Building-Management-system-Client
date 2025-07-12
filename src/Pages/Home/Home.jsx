import useRole from "../../Hooks/useRole";
import LoadingSpinner from "../../Utilities/LoadingSpinner";
import AboutBuilding from "./AboutBuilding";
import CouponBanner from "./CouponBanner";
import HomeBanner from "./HomeBanner";
import LocationSection from "./LocationSection";
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
      <CouponBanner></CouponBanner>
      <AboutBuilding></AboutBuilding>
      <LocationSection></LocationSection>
    </div>
  );
};

export default Home;
