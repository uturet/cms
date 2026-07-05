const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  id: { type: String, required: true },
  subject: { type: String },
  msgText: { type: String, required: true },
  // The front-end stores the sender as the natural "id" of the contact who
  // sent the message and looks the contact up by that id, so we keep it a
  // String rather than an ObjectId reference.
  sender: { type: String }
});

module.exports = mongoose.model('Message', messageSchema);
