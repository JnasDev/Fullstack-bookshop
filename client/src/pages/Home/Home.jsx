import React from "react";
import "./Home.scss";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import TrendingProducts from "../../components/TrendingProducts/TrendingProducts";
import Categories from "../../components/Categories/Categories";
import Contact from "../../components/Contact/Contact";
import Slider from "../../components/Slider/Slider";

const Home = () => {
  return (
    <div className="home">
      <Slider text="WEL'COME TO JONASTORE" />
      <FeaturedProducts type="featured" />
      <Categories />
      <TrendingProducts type="trending" />
      <Contact />
    </div>
  );
};

export default Home;
