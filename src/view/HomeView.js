import React from "react";
import Products from "../components/Products";
import Filter from "../components/Filter";
import Cart from "../components/Cart";

const HomeView = () => {
  return (
    <div className="content">
      <div className="main">
        <Filter></Filter>
        <Products></Products>
      </div>
      <div className="sidebar">
        <Cart />
      </div>
    </div>
  );
};

export default HomeView;
