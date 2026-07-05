const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Records the highest id value used in each collection so the sequence
// generator can hand out unique, incrementing id values.
const sequenceSchema = new Schema({
  maxDocumentId: { type: Number, required: true },
  maxMessageId: { type: Number, required: true },
  maxContactId: { type: Number, required: true }
});

module.exports = mongoose.model('Sequence', sequenceSchema);
