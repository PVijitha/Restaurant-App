import React from "react";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SideDishes({ decQty, incrQty, updatedDishes }) {
  const sideDishesList = updatedDishes.filter(
    (item) => item.category === "Sides"
  );
  return (
    <div>
      {sideDishesList.map((item) => (
        <div className="mt-3" key={item.id}>
          <div className="row">
            <p className="col-7 text">{item.title}</p>
            <div className="col-5 text">
              <div className="btn-group btn-sets me-5">
                <button
                  className="left-btn"
                  onClick={() => decQty(item)}
                >
                  -
                </button>
                <button className="cnt-btn">{item.quantity}</button>
                <button
                  className="right-btn"
                  onClick={() => incrQty(item)}
                >
                  +
                </button>
              </div>
              <FontAwesomeIcon icon={faDollarSign} />
              <b>{item.price}</b>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export  {SideDishes};
