import React from "react";
import { ToastContainer, Toast } from "react-bootstrap";

function Toasts({isToastVisible, isToastVisibleInLogin}) {
  return (
    <div>
      <ToastContainer
        className="p-3"
        position="top-end"
        style={{ zIndex: 1 }}
      >
        <Toast>
          <Toast.Header closeButton={false}>
            <strong className="me-auto text-danger">Error!</strong>
          </Toast.Header>
          <Toast.Body>
            {isToastVisible && "Phone number exists already. Please enter a different one."}
            {isToastVisibleInLogin && "The phone number does not exist."}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Toasts;
