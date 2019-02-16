import React, { Component } from "react";

const EmptyCart = props => {
  return (
    <div className="empty-cart">
      <img
        src="https://cdn3.iconfinder.com/data/icons/pictomisc/100/sadface-512.png"
        alt="empty-cart"
      />
      <h2>You cart is empty!</h2>
    </div>
  );
};

export default EmptyCart;
