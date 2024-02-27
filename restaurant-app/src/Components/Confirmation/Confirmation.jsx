import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Confirmation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Confirmation() {
  const userDetails = useLocation()?.state.userDetails;
  const cartItem = useLocation()?.state.cartItem;
  const totalPrice = useLocation()?.state.totalPrice;
  const navigate = useNavigate();
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const [isActive, setIsActive] = useState(true);
  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setIsActive(false);
      }, 5000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  function setLocalStorageData() {
    localStorage.setItem("Items", JSON.stringify([]));
    localStorage.setItem("userDetails", JSON.stringify());
  }

  function backTohome() {
    setLocalStorageData();
    navigate(`/`);
  }
  return (
    <>
      {!isActive ? (
        <div>
          <div className="text">
            <h1 className="d-flex justify-content-center mt-3 mb-5">
              Order Details
            </h1>
            <div className="row ms-5">
              <div className="col-9">
                <div className="d-flex">
                  <p className="d-flex">
                    <b>Bill-from Address: </b>
                  </p>
                  <p className="address-text ms-2 mt-1">
                    <i>
                    Serenity Haven Retreat - A tranquil escape nestled amidst lush
                backwaters. Discover comfort and charm at 14 Palm Grove Lane,
                Fort Kochi, 682001, Kerala, India.
                    </i>
                  </p>
                </div>
              </div>
              <div className="col-3">
                <div className="d-flex">
                  <p>
                    <b>Order ID:</b>
                  </p>
                  <p className="ms-2">OD56787898987554</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row ms-5">
            <div className="col-3">
              <div className="d-flex">
                <p>
                  <b>Order ID:</b>
                </p>
                <p className="ms-2">
                  <b>OD56787898987554</b>
                </p>
              </div>
              <div className="d-flex">
                <p>
                  <b>Order Date:</b>
                </p>
                <p className="ms-2">{formattedDate}</p>
              </div>
            </div>
            <div className="col-3">
              <p>
                <b>Bill To {userDetails.name}</b>
              </p>
              <p>{userDetails.address}</p>
              <div className="d-flex">
                <p>{userDetails.city}</p>
                <p className="ms-2">{userDetails.zip}</p>
                <p className="ms-2">{userDetails.state}</p>
              </div>
              <p>Phone: {userDetails.phone}</p>
            </div>
            <div className="col-3">
              <p>
                <b>Order from {userDetails.name}</b>
              </p>
              <p>{userDetails.address}</p>
              <div className="d-flex">
                <p>{userDetails.city}</p>
                <p className="ms-2">{userDetails.zip}</p>
                <p className="ms-2">{userDetails.state}</p>
              </div>
              <p>Phone: {userDetails.phone}</p>
            </div>
            <div className="col-3">
              <p>
                <b>Serenity Haven Retreat</b>
              </p>
              <p>
                A tranquil escape nestled amidst lush
                backwaters. Discover comfort and charm at 14 Palm Grove Lane,
                Fort Kochi, 682001, Kerala, India.
              </p>
            </div>
          </div>
          <hr />
          <div className="row ms-5">
            <div className="col-6">

            </div>
            <div className="col-3">
              <p>
                <b>Food Item</b>
                <hr />
              </p>
              {cartItem.map((item) => (
                <div key={item.id}>
                  <p>{item.title}</p>
                </div>
              ))}
              <hr />
              <p><b>Total Items: {cartItem.length}</b></p>
            </div>
            <div className="col-3">
              <p>
                <b>Price</b>
                <hr />
              </p>
              {cartItem.map((item) => (
                <div key={item.id}>
                  <p><FontAwesomeIcon icon={faDollarSign} className="me-1"/>{item.price}</p>
                </div>
              ))}
              <hr />
              <p><b><FontAwesomeIcon icon={faDollarSign} className="me-1"/>{totalPrice}</b></p>
            </div>
          </div>
          <hr />
          <div className="row totalprice-container">
               <div className="col-9">
               </div>
                <div className="col-3">
                  <div className="d-flex">
                    <h5 className="me-5">Grand Total:</h5>
                    <p><b><FontAwesomeIcon icon={faDollarSign} className="ms-"/>{totalPrice}</b></p>
                    </div>
                    <p className="ms-5">Serenity Haven Retreat</p>
                </div>
          </div>
          <p className="d-flex justify-content-end authorized-text">Authorized Signatory</p>
          <hr/>
          <div className="back-to-home-container">
          <button
            type="button"
            className="btn btn-outline-dark ms-5 mt-5"
            onClick={backTohome}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            Back to home
          </button>
          </div>
          <hr className="mb-5"/>
        </div>
      ) : (
        <div className="loader-container">
          <h3>Great news! Your food order went through successfully!</h3>
        </div>
      )}
    </>
  );
}

export default Confirmation;
