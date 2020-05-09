let router = require("express").Router();
var conversationsController = require("../controllers/conversations.controller");

router.route('/')
    .get(conversationsController.index)
    .post(conversationsController.new);

router
  .route("/:conversation_id")
  .get(conversationsController.view)
  .delete(conversationsController.delete);

module.exports = router;
