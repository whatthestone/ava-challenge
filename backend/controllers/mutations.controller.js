var Mutations = require("../models/mutations.model1.js");

// exports.getAll = async (req, res) => {
//   try {
//     const convos = await mutations.find();
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
  Mutations.find(function (err, mutations) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "mutationss retrieved successfully",
      data: mutations,
    });
  });
};

// Handle create mutation actions
exports.new = function (req, res) {
  var mutation = new Mutations();
  mutation.author = req.author;
  mutation.conversationId = req.conversationId;
  mutation.data = req.data;
  mutation.origin = req.origin;
  // save the mutation and check for errors
  mutation.save(function (err) {
    if (err)
        res.json(err);
    res.json({
      message: "New mutation created!",
      data: mutation,
    });
  });
};
// Handle view mutation info
exports.view = function (req, res) {
  Mutations.findById(req.params.mutation_id, function (
    err,
    mutation
  ) {
    if (err) res.send(err);
    res.json({
      message: "mutations details loading..",
      data: mutation,
    });
  });
};
// Handle update mutation info
exports.update = function (req, res) {
  Mutations.findById(req.params.mutation_id, function (
    err,
    mutation
  ) {
    if (err) res.send(err);
    mutation.id = req.id;
    mutation.lastMutation = req.lastMutation;
    mutation.text = req.text;
    // save the mutation and check for errors
    mutation.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "mutations Info updated",
        data: mutation,
      });
    });
  });
};
// Handle delete mutation
exports.delete = function (req, res) {
  Mutations.remove(
    {
      _id: req.params.mutation_id,
    },
    function (err, mutation) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "mutations deleted",
      });
    }
  );
};
