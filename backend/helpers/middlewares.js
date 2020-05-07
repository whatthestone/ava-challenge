function mustBeInteger(req, res, next) {
  const id = req.params.id;
  if (!Number.isInteger(parseInt(id))) {
    res.status(400).json({ message: "ID must be an integer" });
  } else {
    next();
  }
}

function checkFieldsMutation(req, res, next) {
  const { author, conversationId, data, origin } = req.body;
  if (author && conversationId && data && origin) {
    next();
  } else {
    res.status(400).json({ message: "fields are not good" });
  }
}

function checkFieldsConversation(req, res, next) {
  const { id, lastMutation, text } = req.body;
  if (id && lastMutation && text) {
    next();
  } else {
    res.status(400).json({ message: "fields are not good" });
  }
}

module.exports = {
  mustBeInteger,
  checkFieldsMutation,
  checkFieldsConversation
};
