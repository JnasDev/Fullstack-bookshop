import React from "react";
import "./CheckoutSuccess.scss";
import { Link } from "react-router-dom";
import { FcApproval } from "react-icons/fc";

const CheckoutSuccess = () => {
  return (
    <div className="success">
      <FcApproval size={130} />
      <h4>Payments Successfully!</h4>
      <p>Your order has been sent to the store.</p>
      <p>Thank you for your interest and ordering in our product.</p>
      <p>Incase of any inquiries contact the support at</p>
      <strong>support@jonastore.com</strong>
      <button className="s">
        <Link to={"/"}>Back To Home</Link>
      </button>
    </div>
  );
};

export default CheckoutSuccess;
