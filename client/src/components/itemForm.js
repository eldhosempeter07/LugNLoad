// components/ItemForm.js
import React from "react";
import { Form, Button } from "react-bootstrap";

const ItemForm = ({ item, handleItemChange, addItem, disableAdd }) => {
  return (
    <div>
      <div className="mt-3">
        <Form.Group>
          <Form.Label className="semi-bold text-secondary">Name</Form.Label>
          <Form.Control
            type="text"
            value={item.name}
            onChange={(e) => handleItemChange("name", e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="semi-bold text-secondary">Number</Form.Label>
          <Form.Control
            type="number"
            value={item.number}
            onChange={(e) =>
              handleItemChange("number", parseInt(e.target.value))
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="semi-bold text-secondary">
            Length (m)
          </Form.Label>
          <Form.Control
            type="number"
            value={item.length}
            onChange={(e) =>
              handleItemChange("length", parseFloat(e.target.value))
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="semi-bold text-secondary">
            Width (m)
          </Form.Label>
          <Form.Control
            type="number"
            value={item.width}
            onChange={(e) =>
              handleItemChange("width", parseFloat(e.target.value))
            }
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label className="semi-bold text-secondary">
            Height (m)
          </Form.Label>
          <Form.Control
            type="number"
            value={item.height}
            onChange={(e) =>
              handleItemChange("height", parseFloat(e.target.value))
            }
          />
        </Form.Group>
      </div>
      {disableAdd ? (
        <p className=" text-danger mb-0 mt-2">
          Dimensions exceed maximum capacity of large vechicle
        </p>
      ) : null}

      <Button variant="secondary" onClick={addItem} className="mt-1">
        Add More
      </Button>
    </div>
  );
};
export default ItemForm;
