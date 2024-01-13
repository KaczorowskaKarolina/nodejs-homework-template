// routes/api/contacts.js
const express = require('express');
const router = express.Router();

const {
  indexContacts,
  showContacts,
  deleteContacts,
  updateContacts,
  createContacts
} = require('../../controllers/contacts/index.js');

router.get("/", indexContacts);
router.get("/:contactId", showContacts);
router.delete("/:contactId", deleteContacts);
router.put("/:contactId", updateContacts);
router.post("/", createContacts);

module.exports = router;



