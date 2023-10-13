import React, { useEffect, useState } from "react";
import "./Categories.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const Categories = () => {
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
    <div className="categories">
      {categories?.map((item, idx) => (
        <div className="col" key={idx}>
          <div className="row">
            <img src={item.image} alt="" />
            <Link className="link" to={`/products/${item.category_id}`}>
              <button className="prices">{item.title}</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
