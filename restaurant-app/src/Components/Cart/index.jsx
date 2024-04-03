import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { CartList } from "./CartList";
import { Footer } from "./Footer";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Cart() {
  const navigate = useNavigate();
  const [cartItem, setCartItem] = useState([]);
  const [totalPrice, seTotalPrice] = useState(0.0);

  useEffect(() => {
    getLocalStorageData();
  }, []);

  function getLocalStorageData() {
    const item = localStorage.getItem("Items");
    const price = localStorage.getItem("Total");
    seTotalPrice(price);
    if (item) {
      const parsedItems = JSON.parse(item);
      setCartItem(() => {
        return parsedItems;
      });
    }
  }

  return (
    <>
      <div className="row cart-head p-0 m-0">
        <div className="col-3 mt-3 mb-3">
          <button
            type="button"
            className="btn btn-outline-dark add-button d-flex justify-content-start mt-3 ms-5"
            onClick={() => {
              navigate(`/`);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="me-2 mt-1" />
              Back to home
          </button>
        </div>
        <div className="col-6 mt-3 mb-3">
          <h1 className="text d-flex justify-content-center">
            Your cart items
          </h1>
        </div>
        <div className="col-3 mt-3 mb-3">
          {cartItem.length > 0 ? (
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-outline-dark me-5 mt-3"
                onClick={() => {
                  navigate(`/login`);
                }}
              >
                Check out
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <hr className="line" />
      <div className="cart-middle-container">
        <div>
          {cartItem.length > 0 ? (
            <CartList cartItem={cartItem} />
          ) : (
            <div className="d-flex justify-content-center">
              <div className="empty-data d-flex justify-content-center align-items-center">
                <p>No food items!</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {cartItem.length > 0 && (
        <Footer
          cartItem={cartItem}
          totalPrice={totalPrice}
        />
      )}
    </>
  );
}

export default Cart;
