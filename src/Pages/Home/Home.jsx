import { useEffect } from "react";
import AboutBuilding from "./AboutBuilding";
import CouponBanner from "./CouponBanner";
import HomeBanner from "./HomeBanner";
import LocationSection from "./LocationSection";
import QuickStats from "./QuickStats";
import Contact from "./Contact";
const Home = () => {
  useEffect(() => {
    document.title = "BuildMate | Home";
  }, []);
  return (
    <div>
      <HomeBanner></HomeBanner>
      <QuickStats></QuickStats>
      <CouponBanner></CouponBanner>
      <AboutBuilding></AboutBuilding>
      <LocationSection></LocationSection>
      <Contact></Contact>
    </div>
  );
};

export default Home;
