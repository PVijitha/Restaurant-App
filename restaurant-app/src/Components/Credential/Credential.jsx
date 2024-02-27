import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import "./Credential.css";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { stateList } from "../Items.data";
import { useNavigate } from "react-router-dom";

function Credential() {
  const cartItem = useLocation()?.state.cartItem;
  const totalPrice = useLocation()?.state.totalPrice;
  
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    phone: "",
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    if (e.type === "blur") {
      let error = "";
      switch (name) {
        case "email":
          error = !value.match(/[a-zA-Z0-9._-]*@[a-zA-Z]*\.[a-zA-Z]{2,3}/)
            ? "Invalid Email"
            : "";
          break;
        case "phone":
          error =
            value.length !== 10
              ? "Phone number must have 10 digits"
              : value.trim() === ""
              ? "Phone number is required"
              : "";
          break;
        case "name":
          error = value.trim() === "" ? "Name is required" : "";
          break;
        case "address":
          error = value.trim() === "" ? "Address is required" : "";
          break;
        case "city":
          error = value.trim() === "" ? "City is required" : "";
          break;
        case "state":
          error = value === "Choose..." ? "State is required" : "";
          break;
        case "zip":
          error = value.trim() === "" ? "Zip is required" : "";
          break;
        default:
          break;
      }
      setErrors({ ...errors, [name]: error });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
    const formValid =
      Object.values(errors).every((error) => error === "") &&
      Object.values(inputs).every((value) => value !== "");
    setIsFormValid(formValid);
    setInputs({ ...inputs, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLocalStorageData(inputs);
    navigate(`/Confirmation`, { state: { userDetails: inputs, totalPrice: totalPrice, cartItem: cartItem} });
  }

  function setLocalStorageData(inputs) {
    localStorage.setItem("userDetails", JSON.stringify(inputs));
  }
  return (
    <>
      <div className="d-flex justify-content-center mt-5 text">
        <div className="check-out-form">
          <Form className="mt-5" onSubmit={handleSubmit} noValidate>
            <Row className="mb-4">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>
                  Email
                  <FontAwesomeIcon icon={faStar} className="star" />
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="User@123.com"
                  name="email"
                  pattern= "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"
                  value={inputs.email}
                  onChange={handleChange}
                  onBlur={handleChange}
                  required
                />
                <div className="error-container">
                  {errors.email && <p className="error ms-1">{errors.email}</p>}
                </div>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>
                  Phone
                  <FontAwesomeIcon icon={faStar} className="star" />
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="0000000000"
                  name="phone"
                  value={inputs.phone}
                  onChange={handleChange}
                  onBlur={handleChange}
                  required
                />
                <div className="error-container">
                  {errors.phone && <p className="error ms-1">{errors.phone}</p>}
                </div>
              </Form.Group>
            </Row>
            <Form.Group className="mb-4" controlId="formGridAddress1">
              <Form.Label>
                Name
                <FontAwesomeIcon icon={faStar} className="star" />
              </Form.Label>
              <Form.Control
                placeholder="Name"
                name="name"
                value={inputs.name}
                onChange={handleChange}
                onBlur={handleChange}
                required
              />
              <div className="error-container">
                {errors.name && <p className="error ms-1">{errors.name}</p>}
              </div>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formGridAddress2">
              <Form.Label>
                Address
                <FontAwesomeIcon icon={faStar} className="star" />
              </Form.Label>
              <Form.Control
                placeholder="Apartment, studio, or floor"
                name="address"
                value={inputs.address}
                onChange={handleChange}
                onBlur={handleChange}
                required
              />
              <div className="error-container">
                {errors.address && (
                  <p className="error ms-1">{errors.address}</p>
                )}
              </div>
            </Form.Group>
            <Row className="mb-4">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>
                  City
                  <FontAwesomeIcon icon={faStar} className="star" />
                </Form.Label>
                <Form.Control
                  name="city"
                  value={inputs.city}
                  onChange={handleChange}
                  onBlur={handleChange}
                  required
                />
                <div className="error-container">
                  {errors.city && <p className="error ms-1">{errors.city}</p>}
                </div>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>
                  State
                  <FontAwesomeIcon icon={faStar} className="star" />
                </Form.Label>
                <Form.Select
                  defaultValue="Choose..."
                  name="state"
                  onChange={handleChange}
                  onBlur={handleChange}
                  required
                >
                  {stateList.map((state, index) => (
                    <option key={index}>{state}</option>
                  ))}
                </Form.Select>
                <div className="error-container">
                  {errors.state && <p className="error ms-1">{errors.state}</p>}
                </div>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>
                  Zip
                  <FontAwesomeIcon icon={faStar} className="star" />
                </Form.Label>
                <Form.Control
                  name="zip"
                  value={inputs.zip}
                  onChange={handleChange}
                  onBlur={handleChange}
                  required
                />
                <div className="error-container">
                  {errors.zip && <p className="error ms-1">{errors.zip}</p>}
                </div>
              </Form.Group>
            </Row>
            <div className="align-items-center d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-outline-dark mt-5 w-25"
                disabled={!isFormValid}
              >
                Submit
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Credential;
