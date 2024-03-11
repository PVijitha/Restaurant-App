import React from 'react'

function Header() {
  return (
    <div>
      <div className="text ps-5 pe-5">
        <h1 className="d-flex justify-content-center w-100">
          Order Details
        </h1>
        <div className="row">
          <div className="col-9">
            <div className="d-flex">
              <p>
                <b>Bill-from Address: </b>
              </p>
              <p className="ms-2 address-text mt-1">
                <i>
                  Serenity Haven Retreat - Discover comfort and charm at 14 Palm
                  Grove Lane, Fort Kochi, 682001, Kerala, India.
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
    </div>
  )
}

export default Header