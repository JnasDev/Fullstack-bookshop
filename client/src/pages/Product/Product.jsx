import React, { useEffect, useState } from "react";
import "./Product.scss";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import { useParams } from "react-router-dom";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  addToFavorites,
  getFavoritesTotal,
} from "../../features/cartSlice";

import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const [quantity, setQuantity] = useState(1);
  const paramsProduct = parseInt(useParams().id);
  const [product, setProduct] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);

  const items = useSelector((state) => state.allCart.items);

  const notify = () => {
    toast.success("Added to cart successfully!", {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const FavoriteNotify = () => {
    toast.success("Added to Favorite successfully!", {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://jonastore-bookshop-d192c04d2b79.herokuapp.com/api/product/${paramsProduct}`
        );

        setProduct(res.data);
        setSelectedImg(res.data[0]?.img1);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [paramsProduct]);

  const item = {
    product_id: product[0]?.product_id,
    title: product[0]?.title,
    img: product[0]?.img1,
    price: product[0]?.price,
    quantity: quantity,
  };

  return (
    <div className="product">
      <div className="left">
        <div className="images">
          <img
            src={product[0]?.img1}
            alt=""
            onClick={(e) => setSelectedImg(product[0]?.img1)}
          />
          <img
            src={product[0]?.img2}
            alt=""
            onClick={(e) => setSelectedImg(product[0]?.img2)}
          />
        </div>
        <div className="mainImg">
          <img src={selectedImg} alt="" />
        </div>
      </div>
      <div className="right">
        <h1>{product[0]?.title}</h1>
        <span className="sg_first_price">
          THB: <span className="sg_price">{product[0]?.price}</span>
        </span>
        <p>{product[0]?.Description}</p>
        <div className="quantity">
          <button
            className="quan__btn"
            onClick={() => {
              const newQuantity = item.quantity - 1;
              setQuantity(newQuantity < 1 ? 1 : newQuantity);
            }}
          >
            -
          </button>
          <span className="q">{quantity}</span>
          <button
            className="quan__btn"
            onClick={() => setQuantity(item.quantity + 1)}
          >
            +
          </button>
        </div>
        <button
          className="add"
          onClick={() => {
            dispatch(
              addToCart({
                ...item,
                id: product[0]?.product_id,
                quantity: quantity,
              })
            );
            notify();
          }}
        >
          <AddShoppingCartIcon /> ADD TO CART
        </button>

        <div className="links">
          <div
            className="item"
            onClick={() => {
              dispatch(
                addToFavorites({
                  ...item,
                  id: product[0]?.product_id,
                  quantity: quantity,
                })
              );
              dispatch(getFavoritesTotal());
              FavoriteNotify();
            }}
          >
            <FavoriteBorderIcon />
            ADD TO WISHLIST
          </div>
          <div className="item">
            <BalanceIcon /> ADD TO COMPARE
          </div>
        </div>

        <hr />
        <div className="details">
          <span>MORE INFORMATION</span>
          <hr />
          <span>ADDITIONAL INFORMATION</span>
          <hr />
          <span>FAQ</span>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />
    </div>
  );
};

export default Product;
