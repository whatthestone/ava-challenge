var Conversations = require("../models/conversations.model1.js");

//GET all conversations
exports.index = async (req, res) => {
  try {
    const convos = await Conversations.find({}, (err, docs) => {});
    res.header("Access-Control-Allow-Origin", "*");
    // status: "success",
    // results: convos.length,
    // data: { convos },
    res
      .status(200)
      .json({
        conversations: convos,
        msg: "Convos retrieved",
      })
      .send("OK");
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "404 Error",
    });
  }
};

// POST new conversation
exports.new = async (req, res) => {
  const conversation = new Conversations(req.body);

  try {
    const convo = await Conversations.findOne(
      { id: conversation.id },
      (err, convo) => {}
    );
    console.log(convo);
    if (!convo) {
      await conversation.save((err, docs) => {});
      console.log(conversation);
      res.header("Access-Control-Allow-Origin", "*");
      res.send(conversation);
    } else {
      res.send("Conversation ID already exists, please use another ID");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// GET one conversation
exports.view = async (req, res) => {
  try {
    const convo = await Conversations.findOne(
      {
        id: `${req.params.conversation_id}`,
      },
      (err, convo) => {}
    );
    res.header("Access-Control-Allow-Origin", "*");
    res.status(201).json({
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

// DELETE conversation
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
      message: `Deleted conversation: ${req.params.conversation_id}`,
    });
  } catch (err) {
    res.json(err);
  }
};
