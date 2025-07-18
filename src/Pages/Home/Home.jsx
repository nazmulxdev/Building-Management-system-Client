import { useEffect } from "react";
import AboutBuilding from "./AboutBuilding";
import CouponBanner from "./CouponBanner";
import HomeBanner from "./HomeBanner";
import LocationSection from "./LocationSection";
const Home = () => {
  useEffect(() => {
    document.title = "BuildMate | Home";
  }, []);
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
