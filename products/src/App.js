import React from "react";

import ExpenseItem from "./components/ExpenseItem";
// import "./styles.css";

const data = [
  {
    title: "product 1",
    price: "10",
    description: "first product",
  },
  {
    title: "product 2",
    price: "14",
    description: "second product",
  },
];

// don't change the Component name "App"
export default function App() {
  return (
    <div>
      <h1>My Demo Shop</h1>
      <ExpenseItem
        title={data[0].title}
        price={data[0].price}
        description={data[0].description}></ExpenseItem>
      <ExpenseItem
        title={data[1].title}
        price={data[1].price}
        description={data[1].description}></ExpenseItem>
    </div>
  );
}
