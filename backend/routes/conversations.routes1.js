let router = require("express").Router();
var conversationsController = require("../controllers/conversations.controller");

router.route('/')
    .get(conversationsController.index)
    .post(conversationsController.new);

router
  .route("/:conversation_id")
  .get(conversationsController.view)
  // .patch(conversationsController.update)
  // .put(conversationsController.update)
  .delete(conversationsController.delete);

module.exports = router;
