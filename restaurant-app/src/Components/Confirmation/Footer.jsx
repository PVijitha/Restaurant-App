import React from 'react'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer({backTohome}) {
  return (
    <div>
         <button
              type="button"
              className="btn btn-outline-dark ms-5 mb-5"
              onClick={backTohome}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
              Back to home
            </button>
    </div>
  )
}

export default Footer