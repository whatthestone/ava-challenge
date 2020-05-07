const express = require("express");
const router = express.Router();
module.exports = router;
router.use("/conversations", require("./conversations.routes"));
router.use("/mutations", require("./mutations.routes"));
