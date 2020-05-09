import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Row, Button, Card } from "react-bootstrap";
import Convo from "./Convo";

const URL = "ws://localhost:3030";

const Main = ({}) => {
  const [conversations, setConversations] = useState([]);
  const [starredConvos, setStarredConvos] = useState(
    JSON.parse(localStorage.getItem("starredConvos")) || []
  );

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
        console.log(json.data.convos)
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
        <h1 style={{ width: "50rem", margin: "auto", marginBottom: "100px" }}>
          Conversations
        </h1>
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