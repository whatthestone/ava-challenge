let router = require("express").Router();
var mutationsController = require("../controllers/mutations.controller");

router.route('/')
    .get(mutationsController.index)
    .post(mutationsController.new);

module.exports = router;
