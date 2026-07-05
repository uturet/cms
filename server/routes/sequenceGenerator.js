const Sequence = require('../models/sequence');

let maxDocumentId;
let maxMessageId;
let maxContactId;
let sequenceId = null;

function SequenceGenerator() {
  // Eagerly load the current max ids when the server starts.
  init().catch((err) => console.log('sequence init error = ' + err));
}

// Read the single Sequence document from the database (only once) so that the
// in-memory max id counters reflect the values stored in MongoDB.
async function init() {
  if (sequenceId !== null) {
    return;
  }
  const sequence = await Sequence.findOne().exec();
  if (sequence) {
    sequenceId = sequence._id;
    maxDocumentId = sequence.maxDocumentId;
    maxMessageId = sequence.maxMessageId;
    maxContactId = sequence.maxContactId;
  }
}

SequenceGenerator.prototype.nextId = async function (collectionType) {
  await init();

  const updateObject = {};
  let nextId;

  switch (collectionType) {
    case 'documents':
      maxDocumentId++;
      updateObject.maxDocumentId = maxDocumentId;
      nextId = maxDocumentId;
      break;
    case 'messages':
      maxMessageId++;
      updateObject.maxMessageId = maxMessageId;
      nextId = maxMessageId;
      break;
    case 'contacts':
      maxContactId++;
      updateObject.maxContactId = maxContactId;
      nextId = maxContactId;
      break;
    default:
      return -1;
  }

  // Persist the new max id back to the sequences collection.
  try {
    await Sequence.updateOne({ _id: sequenceId }, { $set: updateObject });
  } catch (err) {
    console.log('nextId error = ' + err);
    return null;
  }

  return nextId;
};

module.exports = new SequenceGenerator();
