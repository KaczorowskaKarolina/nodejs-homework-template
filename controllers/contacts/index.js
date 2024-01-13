const {
  indexContacts,
} = require('./indexContacts');
const {
  showContacts
} = require('./showContacts');
const {
  deleteContacts
} = require('./deleteContacts');
const {
  updateContacts
} = require('./updateContacts');

const {
  createContacts
} = require('./createContacts');


module.exports = { deleteContacts,createContacts,updateContacts,showContacts,indexContacts };