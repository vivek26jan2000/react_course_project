import React from "react";
import "./ExpenseItem.css";

export default function ExpenseItem(props) {
  return (
    <article className="product">
      <h2>{props.title}</h2>
      <p className="price">${props.price}</p>
      <p>{props.description}</p>
    </article>
  );
}
