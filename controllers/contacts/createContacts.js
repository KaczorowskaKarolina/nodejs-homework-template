// controllers/contacts/createContacts.js
const { addContact } = require('../../models/contacts');

async function createContacts(req, res, next) {
  const { body } = req;

  try {
    const newContact = await addContact(body);
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = createContacts;
