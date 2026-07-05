const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  url: { type: String },
  // A document can reference related child documents by their ObjectId.
  children: [{ type: Schema.Types.ObjectId, ref: 'Document' }]
});

module.exports = mongoose.model('Document', documentSchema);
