import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Container, Row, Button, Card } from "react-bootstrap";
import Convo from "./Convo";
import { v4 as uuidv4 } from 'uuid';

const Main = ({}) => {
  const [conversations, setConversations] = useState([]);
  const [starredConvos, setStarredConvos] = useState(
    JSON.parse(localStorage.getItem("starredConvos")) || []
  );
  const [newTitle, setNewTitle] = useState(uuidv4());

  useEffect(() => {
    fetch(`http://localhost:8000/conversations`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        let data = json.data.convos;
        data.sort(function (a, b) {
          return a.id.localeCompare(b.id);
        });
        setConversations(data);
      });
  }, [conversations]);

  const handleStar = (toStar, convo) => {
    toStar ? addStar(convo) : delStar(convo);
  };

  const createConvo = () => {
    setNewTitle(uuidv4());
    console.log(newTitle);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: newTitle,
        lastMutation: {},
        text: "",
      }),
    };

    fetch("http://localhost:8000/conversations", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));

    alert(`Convo ${newTitle} Created!`);
  };

  const handleDelete = (id) => {
    const requestOptions = {
      method: "DELETE",
    };

    fetch(`http://localhost:8000/conversations/${id}`, requestOptions).then(
      (response) => {
        return response.json();
      }
    );

    fetch(`http://localhost:8000/conversations`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json.data.convos);
        setConversations(json.data.convos);
      });

    if (starredConvos.length) {
      const newConvos = starredConvos.filter((c) => c.id !== id);
      setStarredConvos(newConvos);
      localStorage.setItem("starredConvos", JSON.stringify(newConvos));
    }
  };

  const addStar = (convo) => {
    if (starredConvos.length) {
      const newConvos = starredConvos.filter((c) => c.id !== convo.id);
      newConvos.push(convo);
      setStarredConvos(newConvos);
      localStorage.setItem("starredConvos", JSON.stringify(newConvos));
    } else {
      const newConvos = starredConvos;
      newConvos.push(convo);
      setStarredConvos([convo]);
      localStorage.setItem("starredConvos", JSON.stringify([convo]));
    }
  };

  const delStar = (convo) => {
    console.log("unstar");
    if (starredConvos.length) {
      const newConvos = starredConvos.filter((c) => c.id !== convo.id);
      setStarredConvos(newConvos);
      localStorage.setItem("starredConvos", JSON.stringify(newConvos));
    }
  };

  return (
    <Container>
      <Row style={{ paddingTop: "100px" }}>
        <h1 style={{ width: "50rem", margin: "auto", marginBottom: "50px" }}>
          Conversations
        </h1>
        <div className="m-5" style={{ textAlign: "center", width: "100%" }}>
          <Button onClick={createConvo}>Create New Convo</Button>
        </div>
        {conversations &&
          conversations.map((convo, index) => (
            <Convo
              convo={convo}
              onStar={(toStar, convo) => handleStar(toStar, convo)}
              onDelete={() => handleDelete(convo.id)}
            />
          ))}
      </Row>
    </Container>
  );
};

export default Main;
