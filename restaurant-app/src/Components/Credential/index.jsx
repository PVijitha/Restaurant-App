import React, { useState } from "react";
import { Form, Row, Col} from "react-bootstrap";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { stateList } from "../Items.data";
import { useNavigate } from "react-router-dom";
import Toasts from "./Toasts";

function Credential() {
  const [isToastVisible, setToast] = useState(false);
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
      let error = "";
      switch (name) {
        case "email":
          error = !value.match(/[a-zA-Z0-9._-]*@[a-zA-Z]*\.[a-zA-Z]{2,3}/)
            ? "Invalid Email"
            : "";
          break;
        case "phone":
          const filteredInput = value.replace(/\D/g, '');
          e.target.value = filteredInput;
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
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors, [name]: error };
        setIsFormValid(validateForm({ ...inputs, [name]: value }, updatedErrors));
        return updatedErrors;
      });
    
      setInputs((prevInputs) => {
        const updatedInputs = { ...prevInputs, [name]: value };
        setIsFormValid(validateForm(updatedInputs, { ...errors, [name]: error }));
        return updatedInputs;
      });
    }
     function validateForm(updatedInputs, updatedErrors) {
      return (
        Object.values(updatedErrors).every((error) => error === "") &&
        Object.values(updatedInputs).every((value) => value !== "")
      );
  }

  function handleSubmit(e) {
    const savedItem = localStorage.getItem("userDetails");
    if (savedItem !== null) {
      const userDetailsArray = JSON.parse(savedItem);
      const newPhoneNumber = inputs.phone;
      const isPhoneNumberExists = userDetailsArray.some(
        (userDetails) => userDetails.phone === newPhoneNumber
      );
      if (isPhoneNumberExists) {
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
        return;
      }
    }
    setLocalStorageData(inputs);
    localStorage.removeItem("UpdatedDishes");
    navigate(`/Confirmation`, {
      state: { phone: inputs.phone, isNewAddress: null },
    });
  }

  function setLocalStorageData(inputs) {
    let savedData = localStorage.getItem("userDetails");
    if (savedData !== null) {
      savedData = JSON.parse(savedData);
      localStorage.setItem(
        "userDetails",
        JSON.stringify([...savedData, inputs])
      );
    } else {
      localStorage.setItem("userDetails", JSON.stringify([inputs]));
    }
  }

  return (
    <>
      <div className="row p-0 m-0">
        <div className="col-6 poster" />
        <div className="col-6 p-0 m-0 text">
          <Form
            className="form-container pt-5"
            onSubmit={(e) =>{e.preventDefault();
            handleSubmit(e)}}
            noValidate
          >
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
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"
                  value={inputs.email}
                  onChange={handleChange}
                  onBlur={handleChange}
                  required
                />
                <div className="error-container">
                  {errors.email && <p className="error ms-1">{errors.email}</p>}
                </div>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPhone">
                <Form.Label>
                  Phone
                  <FontAwesomeIcon icon={faStar} className="star" />
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="0000000000"
                  name="phone"
                  // value={inputs.phone}
                  onChange={handleChange}
                  onBlur={handleChange}
                  required
                />
                <div className="error-container">
                  {errors.phone && <p className="error ms-1">{errors.phone}</p>}
                </div>
              </Form.Group>
            </Row>
            <Form.Group className="mb-4" controlId="formGridAddress">
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
                  placeholder="City"
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
                  type="number"
                  placeholder="000000"
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
            {isToastVisible ? ( <Toasts isToastVisible={isToastVisible}/> ) : null}
          </Form>
        </div>
      </div>
    </>
  );
}

export default Credential;
