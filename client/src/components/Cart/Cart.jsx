import React, { useEffect } from "react";
import "./Cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import axios from "axios";
import { url } from "../../slice/api";

import { useSelector, useDispatch } from "react-redux";
import { getCartTotal, removeItem, resetCart } from "../../features/cartSlice";
import PayButton from "../PayButton";

const Cart = () => {
  const { cart, totalQuantity, totalPrice } = useSelector(
    (state) => state.allCart
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

  const handleResetCart = () => {
    dispatch(resetCart());
  };

  return (
    <div className="cart">
      <h1>Products in your cart</h1>
      {cart.length === 0 ? (
        <h2>Your cart is currently empty.</h2>
      ) : (
        <>
          {cart?.map((item) => (
            <div className="container" key={item.product_id}>
              <div className="item">
                <img src={item.img} alt="" />
                <div className="details">
                <h1>{item.title.substring(0, 15)}...</h1>
                  <p>{item.Description}</p>
                  <div className="price">
                    {item.quantity} x THB {item.price}
                  </div>
                </div>
                <DeleteOutlinedIcon
                  className="delete"
                  onClick={() => dispatch(removeItem(item.id))}
                />
              </div>
            </div>
          ))}
          <div className="total">
            <span>SUBTOTAL</span>
            <span>THB {totalPrice}</span>
          </div>
          <PayButton cartItems={cart} />
          <span className="reset" onClick={handleResetCart}>
            Reset Cart
          </span>
        </>
      )}
    </div>
  );
};

export default Cart;
