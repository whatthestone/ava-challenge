let router = require("express").Router();
var mutationsController = require("../controllers/mutations.controller");

router.route('/')
    .get(mutationsController.index)
    .post(mutationsController.new);

router
  .route("/:mutations_id")
  .get(mutationsController.view)
  .patch(mutationsController.update)
  .put(mutationsController.update)
  .delete(mutationsController.delete);

module.exports = router;
