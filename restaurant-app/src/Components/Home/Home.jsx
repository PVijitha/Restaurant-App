import React, { useEffect, useState } from "react";
import "./Home.css";
import { itemsData, sideDishes } from "../Items.data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [addItem, setAddItem] = useState([]);
  const [price, setPrice] = useState(0.0);

  useEffect(() => {
    getLocalStorageData();
  }, []);

  function selectItemHandle(item) {
    const itemIndex = addItem.findIndex((addItem) => addItem.id === item.id);
    if (itemIndex === -1) {
      const totalPrice = parseFloat(price) + parseFloat(item.price);
      setPrice(totalPrice.toFixed(2));
      setAddItem([...addItem, item]);
    } else {
      const totalPrice = parseFloat(price) - parseFloat(item.price);
      setPrice(totalPrice.toFixed(2));
      const updatedItems = [...addItem];
      updatedItems.splice(itemIndex, 1);
      setAddItem([...updatedItems]);
    }
  }

  function getLocalStorageData() {
    const storedItems = localStorage.getItem("Items");
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      const totalPrice = parsedItems.reduce((acc, item) => acc + item.price, 0);
      const roundedTotalPrice = Math.round(totalPrice * 100) / 100;
      setAddItem(() => {
        return parsedItems;
      });
      setPrice(roundedTotalPrice);
    }
  }

  function setLocalStorageData(addItem) {
    localStorage.setItem("Items", JSON.stringify(addItem));
  }

  function onCart() {
    setLocalStorageData(addItem);
    navigate(`cart`, { state: { items: addItem, totalPrice: price } });
  }

  return (
    <>
      <div className="ps-5 pe-5">
        <div className="head">
          <div className="icon"></div>
          <div className="heading ms-2">THE MOONRISE DINNER</div>
          <button
            type="button"
            className="btn btn-outline-dark ms-5"
            onClick={() => onCart()}
          >
            Go to Cart
            <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
          </button>
        </div>
        <div className="row p-5 middle-container">
          <div className="col-8">
          <h5 className="mb-2">
              <b>Main Dishes</b>
            </h5>
            <hr className="line" />
            {itemsData.map((item) => (
              <div key={item.id}>
                <div className="row">
                  <p className="col-8 text">
                    <b>{item.title}</b>
                  </p>
                  <div className="col-4 text">
                    <input
                      type="checkbox"
                      className="me-2 rounded-checkbox"
                      id="checkbox"
                      checked={
                        addItem.filter((addItem) => addItem.id === item.id)
                          .length > 0
                      }
                      onChange={() => selectItemHandle(item)}
                    />
                    <FontAwesomeIcon icon={faDollarSign} />
                    <b>{item.price}</b>
                  </div>
                </div>
                <p className="w-50 text-desc">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="col-4">
            <h5 className="mb-2">
              <b>Sides</b>
            </h5>
            <hr className="line" />
            {sideDishes.sidesList.map((item) => (
              <div className="mt-3" key={item.id}>
                <div className="row">
                  <p className="col-9 text">{item.title}</p>
                  <div className="col-3 text">
                    <input
                      type="checkbox"
                      className="me-2 rounded-checkbox"
                      id="checkbox"
                      checked={
                        addItem.filter((addItem) => addItem.id === item.id)
                          .length > 0
                      }
                      onChange={() => selectItemHandle(item)}
                    />
                    <FontAwesomeIcon icon={faDollarSign} />
                    <b>{item.price}</b>
                  </div>
                </div>
              </div>
            ))}
            <h5 className="mt-3 mb-4">
              <b>Drinks</b>
            </h5>
            <hr className="line" />
            {sideDishes.drinksList.map((item) => (
              <div className="mt-3" key={item.id}>
                <div className="row">
                  <p className="col-9 text">{item.title}</p>
                  <div className="col-3 text">
                    <input
                      type="checkbox"
                      className="me-2 rounded-checkbox"
                      id="checkbox"
                      checked={
                        addItem.filter((addItem) => addItem.id === item.id)
                          .length > 0
                      }
                      onChange={() => selectItemHandle(item)}
                    />
                    <FontAwesomeIcon icon={faDollarSign} />
                    <b>{item.price}</b>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="row footer w-100 shadow-lg p-0 m-0">
        <hr className="line" />
        <div className="col-6">
          <div className="text ms-5 d-flex">
            <b>Total items :</b>
            <p className="ms-2">
              <b>{addItem.length}</b>
            </p>
          </div>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <div className="text d-flex">
            <b>Total price:</b>
            <FontAwesomeIcon icon={faDollarSign} className="ms-2 mt-1" />
            <p className="ms-1">
              <b>{price}</b>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
