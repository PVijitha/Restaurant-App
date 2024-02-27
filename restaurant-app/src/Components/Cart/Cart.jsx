import React from "react";
import { useLocation } from "react-router-dom";
import {Table} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { useNavigate} from 'react-router-dom';
import "./Cart.css";
function Cart() {
  const cartItem = useLocation()?.state.items;
  const totalPrice = useLocation()?.state.totalPrice;
  const navigate = useNavigate();
  
  return (
    <>
    <h1 className="d-flex justify-content-center text mt-3">Your cart items</h1>
    <hr/>
    <div className="d-flex justify-content-center">
      <Table striped bordered hover className="mt-4 w-50">
      <thead>
        <tr>
          <th>Food Item</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
      { cartItem.length > 0 ?
      cartItem.map((item) => (
        <tr key={item.id}>
          <td>{item.title}</td>
          <td><FontAwesomeIcon icon={faDollarSign} />{item.price}</td>
        </tr>)): 
        <tr className="text-center">
          <td colSpan={2} className="empty-data"><p className="mt-5">No food items!</p></td>
        </tr>}
        <tr>
          <td><b>Total item: {cartItem.length}</b></td>
          <td><b>Total price: <FontAwesomeIcon icon={faDollarSign} />{totalPrice}</b></td>
        </tr>
      </tbody>
    </Table>
    </div>
    {cartItem.length > 0 ?   
    <div className="mt-4">
    <button type="button" className="btn btn-outline-dark add-more" onClick={() => {navigate(`/`)}}>Add more items...</button>
    <button type="button" className="btn btn-outline-dark check-out" onClick={() => {navigate(`/credential`, { state: { cartItem: cartItem, totalPrice: totalPrice}})}}>Check out</button>
    </div> : null
    }
    </>
  );
}

export default Cart;
