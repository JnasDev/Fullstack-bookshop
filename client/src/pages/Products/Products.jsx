import React, { useEffect, useState } from "react";
import "./Products.scss";
import List from "../../components/List/List";
import { useParams } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const catId = parseInt(useParams().id);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState(null);
  const [book, SetBook] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const res = await axios.get(
          `https://jonastore-bookshop-d192c04d2b79.herokuapp.com/api/products/${catId}`
        );

        SetBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    FetchData();
  }, [catId]);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const res = await axios.get(
          `https://jonastore-bookshop-d192c04d2b79.herokuapp.com/api/categories/${catId}`
        );

        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    FetchData();
  }, [catId]);

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <div className="products">
      <div className="left">
        <div className="container__for__padding">
          <div className="filterItem">
            <h2>Filter By Price</h2>
            <span>0</span>
            <input
              type="range"
              min={0}
              max={1000}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <span>{maxPrice}</span>
          </div>
          <div className="filterItem">
            <h2>Sort By</h2>
            <div className="inputItem">
              <input
                type="radio"
                id="asc"
                value="asc"
                name="price"
                onChange={handleSortChange}
              />
              <label htmlFor="asc">Price (Lowest first)</label>
            </div>
            <div className="inputItem">
              <input
                type="radio"
                id="desc"
                value="desc"
                name="price"
                onChange={handleSortChange}
              />
              <label htmlFor="desc">Price (Highest first)</label>
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <img
          className="catImg"
          src={categories[0]?.image}
          alt="IMAGE_CATEGORY"
        />
        <div className="container__list">
          <List catId={catId} book={book} maxPrice={maxPrice} sort={sort} />
        </div>
      </div>
    </div>
  );
};

export default Products;
