const helper = require("../helpers/helper.js");

const handleMut = async (mutation, convo) => {
  console.log("enter");
  try {
    if (!convo && mutation.data.type === "insert") {
      const conversation = new Conversations({
        id: mutation.conversationId,
        lastMutation: mutation,
        text: mutation.data.text,
      });
      newText = text;
      return text;
      const newConvo = await conversation.save();
    } else if (convo && mutation.data.type === "insert") {
      //insert
      const text = convo.text.split("");
      text.splice(mutation.data.index, 0, mutation.data.text);
      const newText = text.join("");

      //update convo
      const conversation = new Conversations({
        id: mutation.conversationId,
        lastMutation: mutation,
        text: newText,
      });

      //update res text
      // return newText;
      const newConvo = await conversation.save();
    } else if (convo && mutation.data.type === "delete") {
      console.log("delete");
      //delete
      const text = convo.text.split("");
      text.splice(mutation.data.index, mutation.data.length);
      const newText = text.join("");

      //delete the old convo
      await Conversations.deleteOne({ _id: convo._id });

      //add the new convo
      const conversation = new Conversations({
        id: mutation.conversationId,
        lastMutation: mutation,
        text: newText,
      });

      //update res text
      // newText;
      const newConvo = await conversation.save();
    }
  } catch (err) {
    newText = err;
  }
};

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
