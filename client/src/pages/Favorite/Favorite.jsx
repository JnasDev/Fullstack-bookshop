import React from "react";
import "./Favorite.scss";
import { AiTwotoneHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  getFavoritesTotal,
  removeFromFavorites,
} from "../../features/cartSlice";
import { Link } from "react-router-dom";

const Favorite = () => {
  const favoriteItems = useSelector((state) => state.allCart.favorites);
  const dispatch = useDispatch();

  const handleRemoveFromFavorites = (id) => {
    dispatch(removeFromFavorites(id));
    dispatch(getFavoritesTotal());
  };

  return (
    <div className="favorite">
      <h1 className="title">Favorite</h1>
      <hr />
      <div className="card__fav">
        {favoriteItems.map((item, idx) => (
          <div className="item__fav" key={idx}>
            <Link to={`/product/${item.product_id}`}>
              <div className="image__fav">
                <img src={item.img || ""} alt="Favorite__img" />
              </div>
              <div className="title__2">
                <h1>{item.title.substring(0, 26)}...</h1>
                <p className="price__fav">THB: {item.price}</p>
              </div>
            </Link>
            <br />
            <div className="checkbox">
              <button className="checkbox__btn">
                <AiTwotoneHeart
                  size={40}
                  onClick={() => {
                    handleRemoveFromFavorites(item.id);
                  }}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;
