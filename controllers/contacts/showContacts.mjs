// controllers/contacts/showContacts.mjs
import { getContactById } from '../../models/contacts.mjs';

async function showContacts(req, res, next) {
  const { contactId } = req.params;
  
  try {
    const contact = await getContactById(contactId);
    
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    res.status(500).json(`An error occurred: ${err}`);
  }
}

export { showContacts };