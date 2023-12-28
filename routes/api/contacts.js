// routes/api/contacts.js

const express = require('express');
const contactsModel = require('../../models/contacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsModel.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await contactsModel.getContactById(contactId);

    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { body } = req;

  try {
    const newContact = await contactsModel.addContact(body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  try {
    await contactsModel.removeContact(contactId);
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
});

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;

  try {
    const updatedContact = await contactsModel.updateContact(contactId, body);
    res.json(updatedContact);
  } catch (error) {
    if (error.message === 'Contact not found') {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

module.exports = router;
