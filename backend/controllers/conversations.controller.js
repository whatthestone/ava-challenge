var Conversations = require("../models/conversations.model1.js");

// exports.getAll = async (req, res) => {
//   try {
//     const convos = await Conversations.find();
//     console.log("getall");
//     res.status(200).json({
//       status: "success",
//       results: convos.length,
//       data: { convos },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };

exports.index = function (req, res) {
  Conversations.find(function (err, conversations) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "Conversationss retrieved successfully",
      data: conversations,
    });
  });
};

// Handle create conversation actions
exports.new = function (req, res) {
  var conversation = new Conversations();
  conversation.id = req.id;
  conversation.lastMutation = req.lastMutation;
  conversation.text = req.text;
  // save the conversation and check for errors
  conversation.save(function (err) {
    if (err)
        res.json(err);
    res.json({
      message: "New conversation created!",
      data: conversation,
    });
  });
};
// Handle view conversation info
exports.view = function (req, res) {
  Conversations.findById(req.params.conversation_id, function (
    err,
    conversation
  ) {
    if (err) res.send(err);
    res.json({
      message: "Conversations details loading..",
      data: conversation,
    });
  });
};
// Handle update conversation info
exports.update = function (req, res) {
  Conversations.findById(req.params.conversation_id, function (
    err,
    conversation
  ) {
    if (err) res.send(err);
    conversation.id = req.id;
    conversation.lastMutation = req.lastMutation;
    conversation.text = req.text;
    // save the conversation and check for errors
    conversation.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "Conversations Info updated",
        data: conversation,
      });
    });
  });
};
// Handle delete conversation
exports.delete = function (req, res) {
  Conversations.remove(
    {
      _id: req.params.conversation_id,
    },
    function (err, conversation) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "Conversations deleted",
      });
    }
  );
};
