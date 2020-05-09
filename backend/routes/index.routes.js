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
    "1": "string, answer to the question 1",
    "2": "string, answer to the question 2",
    "3": "string, answer to the question 3",
  },
};

router.use("/", (req, res) => {
  res.send("hello world");
});
