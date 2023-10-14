import React, { useEffect, useState } from "react";
import "./FeaturedProducts.scss";
import Card from "../Card/Card";
import axios from "axios";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const FeaturedProducts = ({ type }) => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const res = await axios.get(
          `https://jonastore-bookshop-d192c04d2b79.herokuapp.com/api/products/isFeatured/1`
        );

        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    FetchData();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="featuredProducts">
      <div className="top">
        <h1> {type} product</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore
          natus repellat sed soluta, similique quidem, adipisci itaque minima
          voluptatem voluptatibus porro libero alias rem quos rerum maxime
          explicabo sequi, nobis ad facilis! Fugit corrupti minima quae
          explicabo suscipit nihil, magni pariatur accusantium labore.
        </p>
      </div>

      <div className="bottom">
        <div className="container__box">
          <Carousel
            responsive={responsive}
            showDots={true}
            className="Carousels"
          >
            {product?.map((item) => (
              <Card item={item} key={item.product_id} />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
