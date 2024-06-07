import React from "react";
import { ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";

const ItemList = ({ items }) => {
  return (
    <>
      {items?.length > 0 ? (
        <ListGroup className="mt-3">
          <ListGroupItem>
            <Row className="semi-bold">
              <Col>Name</Col>
              <Col>Number</Col>
              <Col>Dimension</Col>
            </Row>
          </ListGroupItem>
          {items.map((item, index) => (
            <ListGroupItem key={index}>
              <Row>
                <Col>{item.name}</Col>
                <Col>{item.number}</Col>
                <Col>
                  {item.length} x {item.width} x {item.height}
                </Col>
              </Row>
            </ListGroupItem>
          ))}
        </ListGroup>
      ) : null}
    </>
  );
};

export default ItemList;
