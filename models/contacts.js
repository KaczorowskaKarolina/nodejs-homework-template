// // models/contacts.js

const { readFile, writeFile } = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');

const contactsFilePath = 'models/contacts.json';

const listContacts = async () => {
  const contactsData = await readFile(contactsFilePath, 'utf-8');
  return JSON.parse(contactsData);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
  await writeFile(contactsFilePath, JSON.stringify(updatedContacts, null, 2));
};

const addContact = async (body) => {
  const { name, email, phone } = body;

  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  const validationResult = schema.validate({ name, email, phone });

  if (validationResult.error) {
    throw new Error(validationResult.error.details[0].message);
  }

  const contacts = await listContacts();
  const newContact = { id: uuidv4(), name, email, phone };
  contacts.push(newContact);
  await writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;

  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
  });

  const validationResult = schema.validate({ name, email, phone });

  if (validationResult.error) {
    throw new Error(validationResult.error.details[0].message);
  }

  const contacts = await listContacts();
  const updatedContacts = contacts.map((contact) =>
    contact.id === contactId ? { ...contact, ...body } : contact
  );

  await writeFile(contactsFilePath, JSON.stringify(updatedContacts, null, 2));

  const updatedContact = updatedContacts.find((contact) => contact.id === contactId);
  if (!updatedContact) {
    throw new Error('Contact not found');
  }

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};



// const express = require('express');
// const {
//   indexContacts,
//   showContacts,
//   deleteContacts,
//   updateContacts,
//   createContacts,
// } = require('../../controllers/contacts/indexContacts.js');

// const router = express.Router();

// router.get('/', indexContacts);
// router.get('/:contactId', showContacts);
// router.delete('/:contactId', deleteContacts);
// router.put('/:contactId', updateContacts);
// router.post('/', createContacts);

// module.exports = router;
