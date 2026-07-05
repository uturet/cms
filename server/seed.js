// Seeds the local "cms" MongoDB database with dummy data so the application
// can be tested. Run with:  node server/seed.js   (or  npm run seed).
//
// This wipes the documents, messages, contacts, and sequences collections and
// re-inserts a known set of records, including the personal contact (id 101)
// and personal message (id 101) required by the assignment.

const mongoose = require('mongoose');
const Document = require('./models/document');
const Message = require('./models/message');
const Contact = require('./models/contact');
const Sequence = require('./models/sequence');

const contacts = [
  {
    id: '1',
    name: 'R. Kent Jackson',
    email: 'jacksonk@byui.edu',
    phone: '208-496-3771',
    imageUrl: 'assets/images/jacksonk.jpg',
    group: [],
  },
  {
    id: '2',
    name: 'Rex Barzee',
    email: 'barzeer@byui.edu',
    phone: '208-496-3768',
    imageUrl: 'assets/images/barzeer.jpg',
    group: [],
  },
  {
    // Personal contact required by the assignment.
    id: '101',
    name: 'Sergey Cybenko',
    email: 'cybenko.sergey@gmail.com',
    phone: '208-555-0101',
    imageUrl: 'assets/images/cybenko.jpg',
    group: [],
  },
];

const documents = [
  { id: '1', name: 'Angular Guide', description: 'Official Angular documentation and guide', url: 'https://angular.io/docs', children: [] },
  { id: '2', name: 'TypeScript Handbook', description: 'Complete TypeScript language reference', url: 'https://www.typescriptlang.org/docs/', children: [] },
  { id: '3', name: 'Bootstrap Docs', description: 'Bootstrap CSS framework documentation', url: 'https://getbootstrap.com/docs/', children: [] },
  { id: '4', name: 'RxJS Reference', description: 'Reactive Extensions for JavaScript', url: 'https://rxjs.dev/guide/overview', children: [] },
  { id: '5', name: 'Node.js Guide', description: 'Node.js official documentation', url: 'https://nodejs.org/en/docs/', children: [] },
];

const messages = [
  { id: '1', subject: 'Welcome', msgText: 'Welcome to the CMS application!', sender: '1' },
  { id: '2', subject: 'Meeting', msgText: "Don't forget about the team meeting on Friday.", sender: '2' },
  { id: '3', subject: 'Reminder', msgText: 'Please submit your weekly report by EOD.', sender: '1' },
  {
    // Personal message required by the assignment; sender references the
    // personal contact (id 101).
    id: '101',
    subject: 'Assignment 11 complete',
    msgText: 'The MongoDB backend for the CMS is up and running.',
    sender: '101',
  },
];

const sequence = {
  maxDocumentId: 5,
  maxMessageId: 101,
  maxContactId: 101,
};

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/cms');
  console.log('Connected to database, seeding...');

  await Promise.all([
    Document.deleteMany({}),
    Message.deleteMany({}),
    Contact.deleteMany({}),
    Sequence.deleteMany({}),
  ]);

  await Contact.insertMany(contacts);
  await Document.insertMany(documents);
  await Message.insertMany(messages);
  await Sequence.create(sequence);

  console.log(
    `Seeded ${contacts.length} contacts, ${documents.length} documents, ` +
      `${messages.length} messages, and 1 sequence record.`
  );

  await mongoose.disconnect();
}

seed()
  .then(() => {
    console.log('Done.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  });
