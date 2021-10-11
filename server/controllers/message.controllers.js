const Message = require('./../models/Message');

module.exports.createMessage = async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getMessages = async (req, res) => {
  try {
    //  const conversationId = req.params.conversationId;
    const messages = await Message.find({ conversationId: req.params.conversationId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};
