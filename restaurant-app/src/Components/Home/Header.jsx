import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Header({ onCart, clearCart}) {
  return (
    <div>
      <div className="head row">
        <div className="col-9 d-flex justify-content-end mt-3">
        <div className="icon me-3"/>
        <div className="heading me-5">THE MOONRISE DINNER</div>
        </div>
        <div className="col-3 d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={clearCart}
          >Clear Cart
          <FontAwesomeIcon icon={faTrash} className="ms-2" />
          </button>
        <button
          type="button"
          className="btn btn-outline-dark ms-3"
          onClick={() => onCart()}
        >
          Go to Cart
          <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
        </button>
        </div>
      </div>
    </div>
  );
}

export  {Header};
