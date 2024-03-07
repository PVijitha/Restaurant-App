import React from 'react'
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer({  totalPrice,
  cartItem,}) {

    let totalQuantity = 0;
    const quantities = cartItem.map((item) => parseFloat(item.quantity));
    quantities.forEach((quantity) => {
    totalQuantity += quantity;
  });
  return (
    <div className="row footer w-100 shadow-lg p-0 m-0">
    <hr className="line" />
    <div className="col-6">
      <div className="text ms-5 d-flex">
        <b>Total items:</b>
        <b className="ms-2">{cartItem.length}</b>
        <b className="ms-5">             
          Total Quantity:                             
        </b>
        <b className="ms-2">{totalQuantity}</b>
      </div>
   </div>
      <div className="col-6 d-flex justify-content-end">
        <div className="text d-flex">
          <b>Total price:</b>
          <FontAwesomeIcon icon={faDollarSign} className="ms-2 mt-1" />
          <p>
            <b>{totalPrice}</b>
          </p>
        </div>
      </div>
</div>
  )
}

export  {Footer}