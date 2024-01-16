// models/contacts.mjs

import mongoose from 'mongoose';
const { Schema } = mongoose;

mongoose.connect('mongodb+srv://kaczorowskakarolina:5ygs2sbnXTVXdIwb@cluster0.wesoj4z.mongodb.net/', {
   useNewUrlParser: true,
  useUnifiedTopology: true,
});

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = mongoose.model('Contact', contactSchema);

const listContacts = async () => {
  try {
    return await Contact.find();
  } catch (error) {
    throw new Error(`Error listing contacts: ${error.message}`);
  }
};

const getContactById = async (contactId) => {
  try {
    return await Contact.findById(contactId);
  } catch (error) {
    throw new Error(`Error getting contact by ID: ${error.message}`);
  }
};

const removeContact = async (contactId) => {
  try {
    await Contact.findByIdAndRemove(contactId);
  } catch (error) {
    throw new Error(`Error removing contact: ${error.message}`);
  }
};

const addContact = async (body) => {
  try {
    return await Contact.create(body);
  } catch (error) {
    throw new Error(`Error adding contact: ${error.message}`);
  }
};

const updateContact = async (contactId, body) => {
  try {
    return await Contact.findByIdAndUpdate(contactId, body, { new: true });
  } catch (error) {
    throw new Error(`Error updating contact: ${error.message}`);
  }
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

