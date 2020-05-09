var Conversations = require("../models/conversations.model1.js");

exports.index = async (req, res) => {
  try {
    const convos = await Conversations.find({}, (err, docs) => {});
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
    const response = await conversation.save((err, docs) => {});
    console.log(response);
    res.header("Access-Control-Allow-Origin", "*");
    res.send(conversation);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Handle view one convo,
exports.view = async (req, res) => {
  try {
    const convo = await Conversations.findOne(
      {
        id: `${req.params.conversation_id}`,
      },
      (err, convo) => {}
    );
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json({
      status: "success",
      data: convo,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Handle update conversation info
exports.update = async (req, res) => {
  try {
    const convo = await Conversations.findOne(
      { id: `${req.params.conversation_id}` },
      (err, convo) => {}
    );
    conversation.id = req.id;
    conversation.lastMutation = req.lastMutation;
    conversation.text = req.text;
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
      message: "Conversations Info updated",
      data: conversation,
    });
  } catch (err) {
    res.json(err);
  }
};

// Handle delete conversation
exports.delete = async (req, res) => {
  const convo = await Conversations.findOne(
    { id: `${req.params.conversation_id}` },
    (err, convo) => {}
  );
  console.log("del: " + convo);
  try {
    console.log(convo);
    await Conversations.deleteOne({ _id: convo._id }, (err, docs) => {});
    res.json({
      message: `Deleted conversation: ${req.params.conversation_id}`
    })
  } catch (err) {
    res.json(err);
  }
};
