import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { stateList } from "../Items.data";
import { useNavigate } from "react-router-dom";
import Toasts from "../Credential/Toasts";

function Login() {
  const navigate = useNavigate();
  const [isNewAddress, setAddress] = useState(false);
  const [isToastVisibleInLogin, setToast] = useState(false);
  const [errors, setErrors] = useState({
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [inputs, setInputs] = useState({
    name: "name",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  function addressHandle() {
    setAddress(true);
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    let error = "";
    switch (name) {
      case "phone":
        const filteredInput = value.replace(/\D/g, '');
        e.target.value = filteredInput;
        console.log(filteredInput);
        error =
          value.length !== 10
            ? "Phone number must have 10 digits"
            : value.trim() === ""
            ? "Phone number is required"
            : "";
        break;
      case "address":
        error =
          value.trim() === "" && isNewAddress ? "Address is required" : "";
        break;
      case "city":
        error = value.trim() === "" && isNewAddress ? "City is required" : "";
        break;
      case "state":
        error =
          value.trim() === "Choose..." && isNewAddress
            ? "State is required"
            : "";
        break;
      case "zip":
        error =
          value.length !== 6
            ? "Zip code must have 6 digits"
            : value.trim() === "" && isNewAddress
            ? "Zip is required"
            : "";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors, [name]: error };
      setIsFormValid(validateForm({ ...inputs, [name]: value }, updatedErrors, isNewAddress));
      return updatedErrors;
    });
  
    setInputs((prevInputs) => {
      const updatedInputs = { ...prevInputs, [name]: value };
      setIsFormValid(validateForm(updatedInputs, { ...errors, [name]: error }, isNewAddress));
      return updatedInputs;
    });
  }
  
  function validateForm(updatedInputs, updatedErrors, isNewAddress) {
    return (
      Object.values(updatedErrors).every((error) => error === "") &&
      (isNewAddress ? Object.values(updatedInputs).every((value) => value !== "") : updatedInputs.phone !== "")
    );
  }

  function handleSubmit(e) {
    const savedItem = localStorage.getItem("userDetails");
    const userDetailsArray = JSON.parse(savedItem);
    if(savedItem === null) {
      setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
        return;
    }
    if (savedItem !== null) {
      const newPhoneNumber = inputs.phone;
      const isPhoneNumberExists = userDetailsArray.some(
        (userDetails) => userDetails.phone === newPhoneNumber
      );
      if (isPhoneNumberExists) {
        setIsFormValid(true);
      }
      if (!isPhoneNumberExists) {
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
        return;
      }
    }
    if (isNewAddress) {
      if (savedItem !== null) {
        const currentUser = userDetailsArray.find(
          (userDetails) => userDetails.phone === inputs.phone
        );
        inputs.name = currentUser.name;
        localStorage.setItem("tempAddress", JSON.stringify(inputs));
      } else {
        setIsFormValid(false);
      }
    }
    localStorage.removeItem("UpdatedDishes");
    navigate("/confirmation", {
      state: { phone: inputs.phone, isNewAddress: isNewAddress },
    });
  }
  return (
    <>
      <div className="row p-0 m-0">
        <div className="col-6 poster" />
        <div className="col-6 p-0 m-0">
          <Form
            className="form-container"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            noValidate
          >
            <h1 className="mt-5 mb-5 d-flex justify-content-center">
              Welcome Back!
            </h1>
            <Row className="mb-3">
              <Form.Group className="mb-3" controlId="formGridPhone">
                <Form.Label>Phone</Form.Label>
                <FontAwesomeIcon icon={faStar} className="star" />
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="0000000000"
                  // value={inputs.phone}
                  onChange={handleChange}
                  onBlur={handleChange}
                  pattern="[0-9]*"
                  required
                />
              </Form.Group>
              <div className="error-container">
                {errors.phone && <p className="error ms-1">{errors.phone}</p>}
              </div>
              {!isNewAddress ? (
                <div>
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-outline-dark mt-4 w-50"
                      disabled={!isFormValid}
                    >
                      Submit
                    </button>
                  </div>
                  <p
                    className="d-flex justify-content-center mt-5 addess-container"
                    onClick={addressHandle}
                  >
                    Order to new address
                  </p>
                  <p
                    className="d-flex justify-content-center register-container"
                    onClick={() => {
                      navigate(`/credential`);
                    }}
                  >
                    Don't have an account? Click here to register.
                  </p>
                </div>
              ) : (
                <div>
                  <Form.Group className="mb-3" controlId="formGridAddress">
                    <Form.Label>Address</Form.Label>
                    <FontAwesomeIcon icon={faStar} className="star" />
                    <Form.Control
                      type="text"
                      placeholder="Apartment, studio, or floor"
                      value={inputs.address}
                      name="address"
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

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>City</Form.Label>
                      <FontAwesomeIcon icon={faStar} className="star" />
                      <Form.Control
                        type="text"
                        value={inputs.city}
                        name="city"
                        onChange={handleChange}
                        onBlur={handleChange}
                        required
                      />
                      <div className="error-container">
                        {errors.city && (
                          <p className="error ms-1">{errors.city}</p>
                        )}
                      </div>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>State</Form.Label>
                      <FontAwesomeIcon icon={faStar} className="star" />
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
                        {errors.state && (
                          <p className="error ms-1">{errors.state}</p>
                        )}
                      </div>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridZip">
                      <Form.Label>Zip</Form.Label>
                      <FontAwesomeIcon icon={faStar} className="star" />
                      <Form.Control
                        type="number"
                        value={inputs.zip}
                        name="zip"
                        onChange={handleChange}
                        onBlur={handleChange}
                        required
                      />
                      <div className="error-container">
                        {errors.zip && (
                          <p className="error ms-1">{errors.zip}</p>
                        )}
                      </div>
                    </Form.Group>
                  </Row>
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-outline-dark mt-4 w-25"
                      disabled={!isFormValid}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </Row>
            {isToastVisibleInLogin ? (
              <Toasts isToastVisibleInLogin={isToastVisibleInLogin}></Toasts>
            ) : null}
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
