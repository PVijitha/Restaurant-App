import React from "react";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TotalContainer({totalPrice}) {
  return (
    <div>
      <div className="row totalprice-container">
        <div className="col-9"></div>
        <div className="col-3">
          <div className="d-flex">
            <h5 className="me-5">Grand Total:</h5>
            <p>
              <b>
                <FontAwesomeIcon icon={faDollarSign} className="ms-" />
                {totalPrice}
              </b>
            </p>
          </div>
          <p className="ms-5">Serenity Haven Retreat</p>
        </div>
      </div>
    </div>
  );
}

export  {TotalContainer};
