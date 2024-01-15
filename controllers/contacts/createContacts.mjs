// controllers/contacts/createContacts.js
import { addContact } from '../../models/contacts.mjs';

async function createContacts(req, res, next) {
  const { body } = req;

  try {
    const newContact = await addContact(body);
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export { createContacts };






// const { addContact } = require('../../models/contacts');

// async function createContacts(req, res, next) {
//   const { body } = req;

//   try {
//     const newContact = await addContact(body);
//     res.status(201).json(newContact);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// }

// module.exports = { createContacts };