// contactModel.js
var mongoose = require("mongoose");
// Setup schema
var conversationsSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  lastMutation: {
    type: Object,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const Conversations = mongoose.model("conversations", conversationsSchema);
module.exports = Conversations;
