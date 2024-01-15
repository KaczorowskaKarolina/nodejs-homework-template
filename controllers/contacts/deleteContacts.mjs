// controllers/contacts/deleteContacts.js
import { removeContact } from '../../models/contacts.mjs';

async function deleteContacts(req, res, next) {
  const { contactId } = req.params;

  try {
    await removeContact(contactId);
    res.status(200).json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(404).json({ message: 'Not found' });
  }
}

export { deleteContacts };





// const { removeContact } = require('../../models/contacts');

// async function deleteContacts(req, res, next) {
//   const { contactId } = req.params;

//   try {
//     await removeContact(contactId);
//     res.status(200).json({ message: 'Contact deleted' });
//   } catch (err) {
//     res.status(404).json({ message: 'Not found' });
//   }
// }

// module.exports = { deleteContacts };
