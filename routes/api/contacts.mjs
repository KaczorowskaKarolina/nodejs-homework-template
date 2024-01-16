// routes/api/contacts.mjs

import express from 'express';
const router = express.Router();

import {
  indexContacts,
  showContacts,
  deleteContacts,
  updateContacts,
  createContacts
} from '../../controllers/contacts/index.mjs';

router.get("/", indexContacts);
router.get("/:contactId", showContacts);
router.delete("/:contactId", deleteContacts);
router.put("/:contactId", updateContacts);
router.post("/", createContacts);

export default router;
