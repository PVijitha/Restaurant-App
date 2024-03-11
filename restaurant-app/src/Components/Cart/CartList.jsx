import React from "react";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function CartList({ cartItem }) {
  return (
    <div className="d-flex flex-row flex-wrap ">
      {cartItem.length > 0
        ? cartItem.map((item) => (
            <div className="ms-3 p-0">
              <div className="row  cart-item-container ms-2 mt-4 m-0 p-0">
                <div className="col-6 mt-3">
                  <img
                    src={require(`../../assets/images/${item.image}.jpeg`)}
                    alt="food-img"
                    className="food-cart-image"
                  />
                </div>
                <div className="col-6 mt-3">
                  <div className="ms-2">
                  <p><b>{item.title}</b></p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price of one: <FontAwesomeIcon icon={faDollarSign}/>{item.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
}

export  {CartList};
