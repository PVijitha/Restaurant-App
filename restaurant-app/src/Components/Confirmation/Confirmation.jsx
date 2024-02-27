import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Confirmation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

function Confirmation() {
  const userDetails = useLocation()?.state.userDetails;
  const cartItem = useLocation()?.state.cartItem;
  const totalPrice = useLocation()?.state.totalPrice;
  console.log(cartItem, "cartItem");
  console.log(totalPrice, "totalPrice");
  console.log(userDetails, "userDeatils");
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
                      573 Tranquil Lane, Blissful Meadows, Orchid Residency,
                      Tower B, Wing 4, Floor 9, Apartment 45, Sector 18, Vasant
                      Kunj Extension, South West Delhi, Delhi 110070, India.
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
                Kochi, Kerala - A tranquil escape nestled amidst lush
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
            </div>
          </div>
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
