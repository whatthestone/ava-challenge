// contactModel.js
var mongoose = require("mongoose");
// Setup schema

var mutationsSchema = mongoose.Schema({
  author: {
    type: String,
    // required: true,
  },
  conversationId: {
    type: String,
    // required: true,
  },
  data: {
    type: Object,
    // required: true,
  },
  origin: {
    type: Object,
    // required: true,
  },
});

const Mutations = mongoose.model("mutations", mutationsSchema);
module.exports = Mutations;
