const express = require("express");
const router = express.Router();
const post = require("../models/mutations.model");
const m = require("../helpers/middlewares");
const handler = require("../handlers/conversation.handler");

// Routes
module.exports = router;

/* All posts */
router.get("/", async (req, res) => {
  await post
    .getPosts()
    .then((posts) => res.json(posts))
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
});

/* A post by id */
router.get("/:id", m.mustBeInteger, async (req, res) => {
  const id = req.params.id;
  await post
    .getPost(id)
    .then((post) => res.json(post))
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
});

/* Insert a new mutation */
router.post("/", m.checkFieldsMutation, async (req, res) => {
  await post
    .insertPost(req.body)
    .then((post) => {
      const updatedPost = handler.handleMutation(post);
      res.status(201).json({
        message: `The post #${post.id} has been created`,
        text: updatedPost,
      });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});

/* Delete a mutation */
router.delete("/:id", m.mustBeInteger, async (req, res) => {
  const id = req.params.id;

  await post
    .deletePost(id)
    .then((post) =>
      res.json({
        message: `The post #${id} has been deleted`,
      })
    )
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      }
      res.status(500).json({ message: err.message });
    });
});
