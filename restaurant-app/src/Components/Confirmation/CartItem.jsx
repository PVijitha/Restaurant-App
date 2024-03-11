import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

function CartItem({cartItem, totalQuantity, totalPrice}) {
  return (
    <div>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-3">
          <p>
            <b>Food Item</b>
          </p>
          <hr />
          {cartItem.map((item) => (
            <div key={item.id}>
              <p>{item.title}</p>
            </div>
          ))}
          <hr />
          <p>
            <b>Total Items: {cartItem.length}</b>
          </p>
        </div>
        <div className="col-3">
          <p>
            <b>Quantity</b>
          </p>
          <hr />
          {cartItem.map((item) => (
            <div key={item.id}>
              <p>{item.quantity}</p>
            </div>
          ))}
          <hr />
          <p>
            <b>{totalQuantity}</b>
          </p>
        </div>
        <div className="col-3">
          <p>
            <b>Price</b>
          </p>
          <hr />
          {cartItem.map((item) => (
            <div key={item.id}>
              <p>
                <FontAwesomeIcon icon={faDollarSign} className="me-1" />
                {item.price}
              </p>
            </div>
          ))}
          <hr />
          <p>
            <b>
              <FontAwesomeIcon icon={faDollarSign} className="me-1" />
              {totalPrice}
            </b>
          </p>
        </div>
      </div>
    </div>
  );
}

export  {CartItem};
