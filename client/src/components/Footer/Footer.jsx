import React, { useEffect, useState } from "react";
import "./Footer.scss";
import axios from "axios";
import { Link } from "react-router-dom";

const Footer = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/categories");

        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    FetchData();
  }, []);

  return (
    <div className="footer">
      <div className="top">
        <div className="item">
          <h1>Categories</h1>
          {categories?.map((cate, idx) => (
            <Link key={idx} to={`/products/${cate.category_id}`}>
            <span >{cate.title}</span>
            </Link>
          ))}
        </div>
        <div className="item">
          <h1>Links</h1>
          <span>FAQ</span>
          <span>Pages</span>
          <span>Stores</span>
          <span>Compare</span>
          <span>Cookies</span>
        </div>
        <div className="item">
          <h1>About</h1>
          <span className="about_and_contact">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur, dolorem quo aperiam cumque illo assumenda nemo
            voluptatem ea magnam quod. Ad assumenda cumque in eveniet laboriosam
            veniam corporis veritatis dolorum!
          </span>
        </div>
        <div className="item">
          <h1>Contact</h1>
          <span className="about_and_contact">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur, dolorem quo aperiam cumque illo assumenda nemo
            voluptatem ea magnam quod. Ad assumenda cumque in eveniet laboriosam
            veniam corporis veritatis dolorum!
          </span>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <span className="logo">Jonastore</span>
          <span className="copyright">
            © Copyright 2023. All Rights Reserved
          </span>
        </div>
        <div className="right">
          <img src="/img/payment.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
