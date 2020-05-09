const express = require("express");
const app = express();
const router = express.Router();
module.exports = router;

router.use("/mutations", require("./mutations.routes1"));
router.use("/conversations", require("./conversations.routes1"));
router.use("/info", (req, res) => {
  res.send(reflections);
});

//
// 1. How did you approach the problem? Tell us in 5-10 sentences max.
// 2. What would you add if you have more time?
// 3. What would you remove / add in the challenge if you were in the hiring side?

const reflections = {
  author: {
    email: "kaising.n@gmail.com",
    name: "Kai Sing, Ng",
  },
  frontend: {
    url: "../../frontend",
  },
  language: "node.js | express | mongodb | react.js",
  sources: "https://github.com/whatthestone/ava-challenge",
  answers: {
    "1":
      "Firstly, I read through the question and tried to simplify the problem as much as possible to get started on the project. Then, I tried to figure out the parts I do not understand by researching on the technologies involved. I am more familiar with the Frontend technologies, so I researched more on the backend. Next, I prototyped the problem step by step, implementing more features and getting rid of bugs as I go. Lastly, I cleaned up the front end to make it more accessible.",
    "2":
      "I would create a more user-friendly frontend, as it currently does not really illustrate the features nicely. I would also try to solve the conflict algorithm which I did not have time for. I did not really have time to use the origins to help with deconflicting issues, and I would really want to learn more about it. Even though I am submitting now, I will still try to implement them after the deadline. Lastly, I would try to clean up my mutation handler to separate the handler helper out. Right now I admit it is pretty messy but I tried to comment out the steps as much as possible. ",
    "3":
      "I really enjoyed the challenge as it allowed me to know what I do not know, especially on the back end side as I have rarely worked with it in my past internships. I have learnt a lot. If I were hiring, I would try to give a wireframe for the frontend, and frame the questions in a more hierachical and simple manner with more visualisations.",
  },
};

router.use("/", (req, res) => {
  res.send("This project is done by Kai Sing Ng");
});
