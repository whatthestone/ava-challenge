var Mutations = require("../models/mutations.model1.js");
var Conversations = require("../models/conversations.model1.js");
var handler = require("../handlers/conversation.handler1.js");

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
  console.log(mutation);
  try {
    const convo = await Conversations.findOne(
      { id: mutation.conversationId },
      (err, convo) => {}
    );
    let newText = mutation.data.text;
    if (convo === null && mutation.data.type === "insert") {
      const convo = new Conversations({
        id: mutation.conversationId,
        lastMutation: mutation,
        text: mutation.data.text,
      });
      await convo.save((req, res) => {});
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
      //delete the old convo
      await Conversations.deleteOne({ _id: convo._id });
      //save new convo
      const newConvo = await conversation.save((err, docs) => {});
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

      //delete the old convo
      await Conversations.deleteOne({ _id: convo._id }, (err, docs) => {});
      //save new convo
      const newConvo = await conversation.save();
    }
    //update res text
    mutation.data.text = newText;
    await mutation.save((req, res) => {});
    res.send(mutation);
  } catch (err) {
    res.header("Access-Control-Allow-Origin", "*");
    res.status(500).send(err);
  }
};

// // Handle view mutation info
// exports.view = function (req, res) {
//   Mutations.findById(req.params.mutation_id, function (err, mutation) {
//     if (err) res.send(err);
//     res.json({
//       message: "mutations details loading..",
//       data: mutation,
//     });
//   });
// };
// // Handle update mutation info
// exports.update = function (req, res) {
//   Mutations.findById(req.params.mutation_id, function (err, mutation) {
//     if (err) res.send(err);
//     mutation.id = req.id;
//     mutation.lastMutation = req.lastMutation;
//     mutation.text = req.text;
//     // save the mutation and check for errors
//     mutation.save(function (err) {
//       if (err) res.json(err);
//       res.json({
//         message: "mutations Info updated",
//         data: mutation,
//       });
//     });
//   });
// };
// // Handle delete mutation
// exports.delete = function (req, res) {
//   Mutations.remove(
//     {
//       _id: req.params.mutation_id,
//     },
//     function (err, mutation) {
//       if (err) res.send(err);
//       res.json({
//         status: "success",
//         message: "mutations deleted",
//       });
//     }
//   );
// };
