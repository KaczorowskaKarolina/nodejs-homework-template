// controllers/contacts/updateContacts.js
const { updateContact } = require('../../models/contacts');

async function updateContacts(req, res, next) {
  const { contactId } = req.params;
  const { body } = req;

  try {
    const updatedContact = await updateContact(contactId, body);
    res.status(200).json(updatedContact);
  } catch (err) {
    if (err.message === 'Contact not found') {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = { updateContacts };
