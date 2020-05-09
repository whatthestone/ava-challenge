var Mutations = require("../models/mutations.model1.js");
var Conversations = require("../models/conversations.model1.js");

//get mutation actions
exports.index = async (req, res) => {
  try {
    const mutations = await Mutations.find({}, (err, docs) => {});
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json({
      status: "success",
      results: mutations.length,
      data: { mutations },
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
  const mutation = new Mutations(req.body);

  try {
    const convo = await Conversations.findOne(
      { id: mutation.conversationId },
      (err, convo) => {}
    );
    let newText = mutation.data.text;

    //if the conversation does not exist, create a new one
    if (convo === null && mutation.data.type === "insert") {
      const convo = new Conversations({
        id: mutation.conversationId,
        lastMutation: mutation,
        text: mutation.data.text,
      });
      await convo.save((req, res) => {});

      //if the conversation exists, and insert is called, insert to existing conversation
    } else if (convo && mutation.data.type === "insert") {

      //insert operations
      const text = convo.text.split("");
      text.splice(mutation.data.index, 0, mutation.data.text);
      newText = text.join("");

      //update convo
      const conversation = new Conversations({
        id: mutation.conversationId,
        lastMutation: mutation,
        text: newText,
      });

      //delete the old convo and save new convo
      await Conversations.deleteOne({ _id: convo._id }, (err, docs) => {});
      const newConvo = await conversation.save((err, docs) => {});

      //if the conversation exists and delete is called
    } else if (convo && mutation.data.type === "delete") {

      //delete operations
      const text = convo.text.split("");
      text.splice(mutation.data.index, mutation.data.length);
      newText = text.join("") || "";
      console.log(newText);

      //add the new convo
      const conversation = new Conversations({
        id: mutation.conversationId,
        lastMutation: mutation,
        text: newText || "",
      });

      //delete the old convo and save the new convo
      await Conversations.deleteOne({ _id: convo._id }, (err, docs) => {});
      const newConvo = await conversation.save();
    }

    //update response text, save mutation entry, send response
    mutation.data.text = newText;
    await mutation.save((req, res) => {});
    res.send(mutation);

  } catch (err) {
    res.header("Access-Control-Allow-Origin", "*");
    res.status(500).send(err);
  }
};
