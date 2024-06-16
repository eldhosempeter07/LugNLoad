// src/DeleteModal.js
import React from "react";
import { Button, Modal } from "react-bootstrap";

const ModalPopup = ({
  show,
  handleClose,
  handlePopup,
  body,
  closebutton,
  submitButtonName,
}) => {
  console.log("hi");

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <div className="m-3 text-end">
        {closebutton ? (
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        ) : null}
        <Button
          variant={`${
            body === "Post Created Sucessfully" ? "success" : "danger"
          }`}
          className="mx-2"
          onClick={handlePopup}
        >
          {submitButtonName}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalPopup;
