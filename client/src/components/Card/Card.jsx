import React from "react";
import "./Card.scss";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  return (
    <Link to={`/product/${item.product_id}`}>
      <div className="card">
        <div className="image">
          {item.isNew === 1 ? <span className="isNew">Hot!</span> : ""}
          <img src={item.img1} alt="" className="mainImg" />
        </div>
        <h1>{item.title.substring(0, 20)}...</h1>
        <p>{item.Description.substring(0, 34)}...</p>
        <div className="container__btn">
          <span className="card_price">THB: {item.price}</span>
          <button className="btn_more">More Details</button>
        </div>
      </div>
    </Link>
  );
};

export default Card;
