const express = require("express");
const app = express();
const router = express.Router();
module.exports = router;

router.use("/mutations", require("./mutations.routes1"));
router.use("/conversations", require("./conversations.routes1"));
router.use("/", (req, res) => {
  res.send("hello world");
});
// async function runCode() {
//   // Create an instance of model SomeModel
//   var testInstance = new Conversations({
//     id: "convo2",
//     lastMutation: {
//       id: 7,
//       createdAt: "Wed May 06 2020 13:54:54 GMT-0700 (Pacific Daylight Time)",
//       updatedAt: "Wed May 06 2020 13:54:54 GMT-0700 (Pacific Daylight Time)",
//       author: "alice",
//       data: { index: 4, text: " big", type: "insert" },
//       origin: { alice: 3, bob: 6 },
//     },
//     text: "The house is lol",
//   });
//
//   const doc = await testInstance.save();
//   console.log(doc);
// }
//
// runCode().catch((error) => {
//   console.error(error);
// });

// var Mutations = require("../models/mutations.model1.js");
//
// async function runCode() {
//   // Create an instance of model SomeModel
//   var testInstance = new Mutations({
//     author: "bob",
//     conversationId: "158882223326",
//     data: {
//       type: "delete",
//       index: 0,
//       length: 4,
//     },
//     origin: {
//       bob: 0,
//       alice: 0,
//     },
//   });
//
//   const doc = await testInstance.save();
//   console.log(doc);
// }
//
// runCode().catch((error) => {
//   console.error(error);
// });
//
// var testInstance = new Mutations({
//   author: "bob",
//   conversationId: "158882223326",
//   data: {
//     type: "delete",
//     index: 0,
//     length: 4,
//   },
//   origin: {
//     bob: 0,
//     alice: 0,
//   },
// });
//
// testInstance.save(function (error, document) {
//   if (error) console.error(error)
//   console.log(document)
// })
