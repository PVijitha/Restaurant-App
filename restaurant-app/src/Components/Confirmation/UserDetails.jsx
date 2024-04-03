import React from "react";

function UserDetails({formattedDate, userDetails}) {
  return (
    <div>
        <div className="row">
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
              <p>{userDetails.zip}</p>
              <p className="ms-2">{userDetails.city}</p>
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
              <p>{userDetails.zip}</p>
              <p className="ms-2">{userDetails.city}</p>
              <p className="ms-2">{userDetails.state}</p>
            </div>
            <p>Phone: {userDetails.phone}</p>
          </div>
          <div className="col-3">
            <p>
              <b>Serenity Haven Retreat</b>
            </p>
            <p>
              A tranquil escape nestled amidst lush backwaters. Discover comfort
              and charm at 14 Palm Grove Lane, Fort Kochi, 682001, Kerala,
              India.
            </p>
          </div>
        </div>
      </div>
  );
}

export  {UserDetails};
