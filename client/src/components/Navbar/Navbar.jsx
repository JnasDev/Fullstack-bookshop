import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import Cart from "../Cart/Cart";
import axios from "axios";
import { MdFavorite } from "react-icons/md";

import { useSelector, useDispatch } from "react-redux";

import { getCartTotal } from "../../features/cartSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { cart, totalQuantity } = useSelector(
    (state) => state.allCart
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <div className="item">
            <img src="/img/en.png" alt="Flag" />
            <KeyboardArrowDownIcon />
          </div>

          <div className="item">
            <span>USD</span>
            <KeyboardArrowDownIcon />
          </div>
          <div className="item">
            <Link className="link" to={"products/1"}>
              JAVASCRIPT
            </Link>
          </div>
          <div className="item">
            <Link className="link" to={"products/2"}>
              REACTJS
            </Link>
          </div>
        </div>

        <div className="center">
          <Link className="link_main" to={"/"}>
            JONASTORE
          </Link>
        </div>

        <div className="right">
          <div className="item">
            <Link className="link" to={"/"}>
              Home
            </Link>
          </div>
          <div className="item">
            <Link className="link" to={"/"}>
              About
            </Link>
          </div>
          <div className="item">
            <Link className="link" to={"/"}>
              Contact
            </Link>
          </div>
          <div className="icons">
            <SearchIcon />
            <PersonOutlineOutlinedIcon />
            <div className="favIcon">
              <Link to={"/favorite"}>
                <MdFavorite size={25} />
              </Link>
            </div>
            <div className="cartIcon" onClick={() => setOpen(!open)}>
              <ShoppingCartOutlinedIcon />
              <span>{totalQuantity}</span>
            </div>
          </div>
        </div>
      </div>
      {open && <Cart />}
    </div>
  );
};

export default Navbar;
