var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');

// GET /contacts - return the list of all contacts, mapping the group
// ObjectId references to the actual Contact objects via populate().
router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contact.find().populate('group');
    res.status(200).json({
      message: 'Contacts fetched successfully!',
      contacts: contacts
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }
});

// POST /contacts - add a new contact to the collection
router.post('/', async (req, res, next) => {
  try {
    const maxContactId = await sequenceGenerator.nextId('contacts');

    const contact = new Contact({
      id: maxContactId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      imageUrl: req.body.imageUrl,
      group: req.body.group
    });

    const createdContact = await contact.save();
    res.status(201).json({
      message: 'Contact added successfully',
      contact: createdContact
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }
});

// PUT /contacts/:id - update an existing contact
router.put('/:id', async (req, res, next) => {
  try {
    const contact = await Contact.findOne({ id: req.params.id });
    if (!contact) {
      return res.status(500).json({
        message: 'Contact not found.',
        error: { contact: 'Contact not found' }
      });
    }

    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    contact.imageUrl = req.body.imageUrl;
    contact.group = req.body.group;

    await Contact.updateOne({ id: req.params.id }, contact);
    res.status(204).json({
      message: 'Contact updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }
});

// DELETE /contacts/:id - delete an existing contact
router.delete('/:id', async (req, res, next) => {
  try {
    const contact = await Contact.findOne({ id: req.params.id });
    if (!contact) {
      return res.status(500).json({
        message: 'Contact not found.',
        error: { contact: 'Contact not found' }
      });
    }

    await Contact.deleteOne({ id: req.params.id });
    res.status(204).json({
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }
});

module.exports = router;
