import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const RequestPopup = ({ show, handleClose, handleSave }) => {
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [budget, setBudget] = useState("");
  const [shared, setShared] = useState(false);
  const [seat, setSeat] = useState(false);

  const handleSharedChange = (e) => {
    setShared(e.target.value === "true" ? true : false);
  };

  const handleSeatChange = (e) => {
    setSeat(e.target.value === "true" ? true : false);
  };

  const handleSubmit = () => {
    handleSave({ time, message, budget, shared, seat });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Request Haul</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <Form>
          <Form.Group controlId="time">
            <Form.Label className="semi-bold text-secondary">Time</Form.Label>
            <Form.Control
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="message" className="my-3">
            <Form.Label className="semi-bold text-secondary">
              Message
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="budget" className="my-3">
            <Form.Label className="semi-bold text-secondary">Budget</Form.Label>
            <Form.Control
              type="number"
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value))}
            />
          </Form.Group>
          <Form.Group controlId="shared" className="my-3">
            <Form.Label className="semi-bold text-secondary">Shared</Form.Label>
            <Form.Check
              type="radio"
              label="Yes"
              name="shared"
              value={true}
              checked={shared === true}
              onChange={handleSharedChange}
            />
            <Form.Check
              type="radio"
              label="No"
              name="shared"
              value={false}
              checked={shared === false}
              onChange={handleSharedChange}
            />
          </Form.Group>
          <Form.Group controlId="seat" className="my-3">
            <Form.Label className="semi-bold text-secondary">Seat</Form.Label>
            <Form.Check
              type="radio"
              label="Yes"
              name="seat"
              value={true}
              checked={seat === true}
              onChange={handleSeatChange}
            />
            <Form.Check
              type="radio"
              label="No"
              name="seat"
              value={false}
              checked={seat === false}
              onChange={handleSeatChange}
            />
          </Form.Group>
        </Form>
        <div className="d-flex justify-content-end">
          <Button
            variant="primary"
            className="primary-bgcolor"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button variant="secondary" className="mx-2" onClick={handleClose}>
            Close
          </Button>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
      </Modal.Footer> */}
    </Modal>
  );
};

export default RequestPopup;
