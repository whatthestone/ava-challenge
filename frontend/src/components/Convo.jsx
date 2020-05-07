import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Row, Button, Card } from "react-bootstrap";

const Convo = ({ convo, onStar, onDelete }) => {
  const [isStarred, setStarred] = useState(
    JSON.parse(localStorage.getItem("starredConvos")) &&
      JSON.parse(localStorage.getItem("starredConvos")).filter(
        (c) => (c.id === convo.id)
      ).length
  );

  return (
    <Card style={{ width: "50rem", margin: "auto", marginBottom: "2rem" }}>
      <Card.Body>
        <Card.Title>{convo.id}</Card.Title>
        <Card.Text>{`"${convo.text}"`}</Card.Text>
        <hr />
        <Card.Text>
          <div>Last Mutation By: {convo.lastMutation.author}</div>
          <div>
            {convo.lastMutation.data.type}: {convo.lastMutation.data.text} @
            index {convo.lastMutation.data.index}
          </div>
        </Card.Text>
        <Button
          className="m-2"
          variant={`${isStarred ? "warning" : "outline-warning"}`}
          onClick={() => {
            onStar(!isStarred, convo);
            setStarred(!isStarred);
          }}
        >
          {isStarred ? "Starred" : "Star"}
        </Button>
        <Button
          className="m-2"
          variant="danger"
          onClick={() => onDelete(convo.id)}
        >
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Convo;
