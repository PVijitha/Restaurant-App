import React from "react";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MainDishes({ decQty, incrQty, updatedDishes}) {

  const mainList = updatedDishes.filter(
    (item) => item.category === "Main Dish"
  );
  return (
    <div>
      {mainList.map((item) => (
        <div key={item.id}>
          <div className="row">
            <div className="col-3">
              <img
                src={require(`../../assets/images/${item.image}.jpeg`)}
                alt="img"
                className="image-container"
              />
            </div>
            <div className="col-9 row">
              <div className="col-8 text m-0 p-0">
                <p>
                  <b>{item.title}</b>
                </p>
                <p className="text-desc">{item.description}</p>
              </div>
              <div className="col-4 text">
                <div className="btn-group btn-sets me-5">
                  <button className="left-btn" onClick={() => decQty(item)}>
                    -
                  </button>
                  <button className="cnt-btn">{item.quantity}</button>
                  <button className="right-btn" onClick={() => incrQty(item)}>
                    +
                  </button>
                </div>
                <FontAwesomeIcon icon={faDollarSign} />
                <b>{item.price}</b>
              </div>
              <hr />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export  {MainDishes};
