// routes/api/contacts.js
import express from 'express';
import { indexContacts, createContacts } from '#controllers/contacts/indexContacts.js';
import {
  showContacts,
  deleteContacts,
  updateContacts,
  updateStatusContactController
} from '#controllers/contacts/index.js';

import { authenticateUser } from '#controllers/contacts/indexContacts.js';

const router = express.Router();

router.use(authenticateUser);

router.get("/", indexContacts);
router.get("/:contactId", showContacts);
router.delete("/:contactId", deleteContacts);
router.put("/:contactId", updateContacts);
router.post("/", createContacts);
router.patch("/:contactId/favorite", updateStatusContactController);

export default router;