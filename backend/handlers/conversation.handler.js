const convoFile = path.join(__dirname, "../data/conversations.json");
const convos = require(convoFile);
const helper = require("../helpers/helper.js");

const handleMutation = (post) => {
  //if the convo doesnt exist, create a new one. Else insert / del accordingly.
  if (!convos.filter((c) => c.id === post.conversationId).length) {
    const newConvo = {
      id: post.conversationId,
      lastMutation: post,
      text: post.data.text,
    };
    updateConvos(newConvo);
    console.log(newConvo);
    return post.data.text;
  } else {
    const convo = convos.filter((c) => c.id === post.conversationId)[0];

    if (post.data.type === "insert") {
      return insertMutation(post, post.conversationId, convo);
    } else if (post.data.type === "delete") {
      return deleteMutation(post, post.conversationId, convo);
    }
  }
};

const deleteMutation = (post, id, convo) => {
  const text = convo.text.split("");
  text.splice(post.data.index, post.data.length);
  const newText = text.join("");

  updatedConvo = {
    id: id,
    lastMutation: post,
    text: newText,
  };

  updateConvos(updatedConvo);

  return newText;
};

const insertMutation = (post, id, convo) => {
  const text = convo.text.split("");
  text.splice(post.data.index, 0, post.data.text);
  const newText = text.join("");
  const index = convos.findIndex((p) => p.id == post.id);

  updatedConvo = {
    id: id,
    lastMutation: post,
    text: newText,
  };

  updateConvos(updatedConvo);

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
