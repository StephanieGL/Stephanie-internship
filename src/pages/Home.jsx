import React, { useEffect } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    AOS.init();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <section className="no-bottom no-top" id="content">
        <div id="top"></div>

        {/* Pass the data-aos attribute to the Landing component */}
        <div data-aos="fade-in" data-aos-duration="1000">
          <Landing />
        </div>

        {/* Wrap each subsequent section in a div with its own animation attribute */}
        <div data-aos="fade-up" data-aos-duration="1000">
          <LandingIntro />
        </div>

        <div data-aos="fade-up" data-aos-duration="1000">
          <HotCollections />
        </div>

        <div data-aos="fade-up" data-aos-duration="1000">
          <NewItems />
        </div>

        <div data-aos="fade-up" data-aos-duration="1000">
          <TopSellers />
        </div>

        <div data-aos="fade-up" data-aos-duration="1000">
          <BrowseByCategory />
        </div>

      </section>
    </div>
  );
};

export default Home;