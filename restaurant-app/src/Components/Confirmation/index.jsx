import React, { useEffect, useState } from "react";
import "./index.css";
import { useLocation, useNavigate } from "react-router-dom";
import {UserDetails} from "./UserDetails";
import {CartItem} from "./CartItem";
import {TotalContainer} from "./TotalContainer";
import Header from "./Header";
import Footer from "./Footer";
function Confirmation() {
  const [cartItem, setCartItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [userDetails, setUserDetails] = useState({});
  const phone = useLocation()?.state.phone;
  const isNewAddress = useLocation()?.state.isNewAddress;

  useEffect(() => {
    getLocalStorageData();
    getUserDetails();
  }, []);

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

  function getUserDetails() {
    const details = localStorage.getItem("userDetails");
    if (details) {
      if (isNewAddress === null || !isNewAddress) {
        const parsedDetails = JSON.parse(details);
        const userWithPhoneNumber = parsedDetails.find(
          (user) => user.phone === phone
        );
        setUserDetails(() => {
          return userWithPhoneNumber;
        });
      } else {
        const tempDetails = localStorage.getItem("tempAddress");
        const parsedDetails = JSON.parse(tempDetails);
        setUserDetails(() => {
          return parsedDetails;
        });
      }
    }
  }

  function getLocalStorageData() {
    const item = localStorage.getItem("Items");
    const price = localStorage.getItem("Total");
    if (item) {
      const parsedItems = JSON.parse(item);
      setCartItem(() => {
        return parsedItems;
      });
    }
    setTotalPrice(price);
  }

  let totalQuantity = 0;
  const quantities = cartItem.map((item) => parseFloat(item.quantity));
  quantities.forEach((quantity) => {
  totalQuantity += quantity;
  });

  function backTohome() {
    localStorage.removeItem("Items");
    localStorage.removeItem("Total");
    navigate(`/`);
  }
  return (
    <>
      {!isActive ? (
        <div>
          <Header></Header>
          <hr className="line" />
          <div className="mid-container p-5">
            <UserDetails
              formattedDate={formattedDate}
              userDetails={userDetails}
            />
            <hr />
            <CartItem
              totalQuantity={totalQuantity}
              cartItem={cartItem}
              totalPrice={totalPrice}
            />
            <hr />
            <TotalContainer totalPrice={totalPrice} />
            <p className="d-flex justify-content-end">Authorized Signatory</p>
            <hr />
          </div>
          <hr className="line" />
          <Footer backTohome={backTohome}></Footer>
        </div>
      ) : (
        <div className="loader-container">
          <h3>Congratulations! Your delicious food order has been successfully placed.</h3>
        </div>
      )}
    </>
  );
}

export default Confirmation;
