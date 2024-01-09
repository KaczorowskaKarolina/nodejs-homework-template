// routes/api/contacts.js
import express from 'express';
import indexContacts from '../../controllers/contacts/indexContacts';
import showContacts from '../../controllers/contacts/showContacts';
import deleteContacts from '../../controllers/contacts/deleteContacts';
import updateContacts from '../../controllers/contacts/updateContacts';
import createContacts from '../../controllers/contacts/createContacts';

const router = express.Router();

router.get("/", indexContacts);
router.get("/:contactId", showContacts);
router.delete("/:contactId", deleteContacts);
router.put("/:contactId", updateContacts);
router.post("/", createContacts);

export { router };
