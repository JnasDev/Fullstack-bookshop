import React from "react";
import "./List.scss";
import Card from "../Card/Card";
import { useParams } from "react-router-dom";

const List = ({ catId, book, maxPrice, sort }) => {
  // console.log("book2:" ,book)
  const sortedBook = [...book];

  // ถ้าผลลัพธ์เป็นค่าลบ แสดงว่า "low" มีราคาน้อยกว่า "high" และจะถูกวางไว้ก่อน "high" ในอาร์เรย์เรียงลำดับ และถ้าผลลัพธ์เป็นค่าบวก แสดงว่า "low" มีราคามากกว่า "high" และจะถูกวางไว้หลัง "high" ในอาร์เรย์เรียงลำดับ
  if (sort === "asc") {
    sortedBook.sort((low, high) => low.price - high.price);
  } else if (sort === "desc") {
    sortedBook.sort((low, high) => high.price - low.price);
  }

  return (
    <div className="list">
      {sortedBook
        .filter((item) => item.price <= maxPrice)
        .map((item, idx) => (
          <div className="items" key={idx}>
            <Card item={item} key={item.product_id} />
          </div>
        ))}
    </div>
  );
};

export default List;
