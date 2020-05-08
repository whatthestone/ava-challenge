var Conversations = require("../models/conversations.model1.js");


exports.index = async (req, res) => {
  try {
    const convos = await Conversations.find();
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json({
      status: "success",
      results: convos.length,
      data: { convos },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Handle create mutation actions
exports.new = async (req, res) => {
  const conversation = new Conversations(req.body);
  try {
    const response = await conversation.save();
    console.log(response);
    res.send(conversation);
  } catch (err) {
    res.status(500).send(err);
  }
};
// // Handle view conversation info
// exports.view = function (req, res) {
//   Conversations.findById(req.params.conversation_id, function (
//     err,
//     conversation
//   ) {
//     // if (err) res.send(err);
//     res.json({
//       message: "Conversations details loading..",
//       data: conversation,
//     });
//   });
// };
// // Handle update conversation info
// exports.update = function (req, res) {
//   Conversations.findById(req.params.conversation_id, function (
//     err,
//     conversation
//   ) {
//     if (err) res.send(err);
//     conversation.id = req.id;
//     conversation.lastMutation = req.lastMutation;
//     conversation.text = req.text;
//     // save the conversation and check for errors
//     conversation.save(function (err) {
//       if (err) res.json(err);
//       res.json({
//         message: "Conversations Info updated",
//         data: conversation,
//       });
//     });
//   });
// };
// // Handle delete conversation
// exports.delete = function (req, res) {
//   Conversations.remove(
//     {
//       _id: req.params.conversation_id,
//     },
//     function (err, conversation) {
//       if (err) res.send(err);
//       res.json({
//         status: "success",
//         message: "Conversations deleted",
//       });
//     }
//   );
// };
