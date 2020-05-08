const helper = require("../helpers/helper.js");

const handleMutation = (mutation, convo) => {
  console.log(convo);

  if (mutation.data.type === "insert") {
    return insertMutation(mutation, mutation.conversationId, convo);
  } else if (mutation.data.type === "delete") {
    return deleteMutation(mutation, mutation.conversationId, convo);
  }
};

const deleteMutation = (mutation, id, convo) => {
  const text = convo.text.split("");
  text.splice(mutation.data.index, mutation.data.length);
  const newText = text.join("");
  //
  // updatedConvo = {
  //   id: id,
  //   lastMutation: mutation,
  //   text: newText,
  // };

  // updateConvos(updatedConvo);

  return newText;
};

const insertMutation = (mutation, id, convo) => {
  const text = convo.text.split("");
  text.splice(mutation.data.index, 0, mutation.data.text);
  const newText = text.join("");
  //
  // updatedConvo = {
  //   id: id,
  //   lastMutation: mutation,
  //   text: newText,
  // };

  // updateConvos(updatedConvo);

  return newText;
};

const updateConvos = (updatedConvo) => {
  const newConvos = convos.filter((c) => c.id !== updatedConvo.id);
  newConvos.push(updatedConvo);
  helper.writeJSONFile(convoFile, newConvos);
};

module.exports = {
  handleMutation,
  deleteMutation,
  insertMutation,
};
