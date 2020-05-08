var Mutations = require("../models/mutations.model1.js");
// var handler = require("../handlers/conversation.handler.js");

exports.index = async (req, res) => {
  try {
    const mutations = await Mutations.find();
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
    // handler.handleMutation(mutation);
    const response = await mutation.save();
    console.log(response);
    res.send(mutation);
  } catch (err) {
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
