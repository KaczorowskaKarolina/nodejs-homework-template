// controllers/contacts/createContacts.mjs
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