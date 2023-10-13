import React from "react";
import "./Failed.scss";
import { Link } from "react-router-dom";
import { FcHighPriority } from "react-icons/fc";

const Failed = () => {
  return (
    <div className="failed">
      <FcHighPriority size={130} />
      <h4>Payments Failed!</h4>
      <p>We can't recept your order please contact at</p>
      <strong>support@jonastore.com</strong>
      <button className="f">
        <Link to={"/"}>Back To Home</Link>
      </button>
    </div>
  );
};

export default Failed;
