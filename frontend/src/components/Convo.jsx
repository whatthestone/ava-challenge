import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Col, Container, Row, Button, Card } from "react-bootstrap";

const Convo = ({ convo, onStar, onDelete }) => {
  const [isStarred, setStarred] = useState(
    JSON.parse(localStorage.getItem("starredConvos")) &&
      JSON.parse(localStorage.getItem("starredConvos")).filter(
        (c) => c.id === convo.id
      ).length
  );

  const [convoText, setConvoText] = useState(convo.text || null);
  const [mutate, setMutate] = useState(false);

  const insertT = (oldT, newT) => {
    let start = -1;

    for (var i = 0; i < newT.length; i++) {
      if (oldT[i] !== newT[i]) {
        start = i;
        return [start, newT.splice(start, newT.length - oldT.length).join("")];
      }
    }

    return [start, newT.slice(oldT.length).join("")];
  };

  const deleteT = (oldT, newT) => {
    let start = -1;

    for (var i = 0; i < oldT.length; i++) {
      if (oldT[i] !== newT[i]) {
        start = i;
        return [start, oldT.length - newT.length];
      }
    }

    return [newT.length, oldT.length - newT.length];
  };

  const sendMutation = (newText) => {
    const oldText = convoText;
    setConvoText(newText);
    //insert
    const oldT = oldText && oldText.split("");
    const newT = newText && newText.split("");
    let newData = {};

    if (oldT.length < newT.length) {
      const result = insertT(oldT, newT);
      newData = {
        type: "insert",
        index: result[0],
        text: result[1],
      };
    } else {
      const result = deleteT(oldT, newT);
      newData = {
        type: "delete",
        index: result[0],
        length: result[1],
      };
    }

    console.log(newData);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        author: "alice",
        conversationId: convo.id,
        data: newData,
        origin: {
          bob: 0,
          alice: 0,
        },
      }),
    };

    fetch("http://localhost:8000/mutations", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

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
        <Button
          className="m-2"
          variant="primary"
          onClick={() => setMutate(true)}
        >
          Edit
        </Button>
        {mutate && (
          <Form>
            <Form.Group controlId="mutate">
              <Form.Label>New Mutation</Form.Label>
              <div
                style={{
                  display: "grid",
                  width: "100%",
                  "grid-template-columns": "5fr 1fr",
                }}
              >
                <Form.Control
                  className="m-2"
                  defaultValue={convoText}
                  onChange={(e) => sendMutation(e.target.value)}
                />
                <Button onClick={sendMutation} className="m-2">
                  Send
                </Button>
              </div>

              <Form.Text className="text-muted">Enter your mutation</Form.Text>
            </Form.Group>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
};

export default Convo;
