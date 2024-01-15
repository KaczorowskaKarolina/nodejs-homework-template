// // app.js

import express from 'express';
const app = express();
import contactsRouter from './routes/api/contacts';

// Dodaj middleware do obsługi danych w formacie JSON
app.use(express.json());

// Dodaj router obsługujący endpointy związanymi z kontaktami
app.use('/api/contacts', contactsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serwer działa. Używaj API na porcie: ${PORT}`);
});


// const express = require('express');
// const app = express();
// const contactsRouter = require('./routes/api/contacts');

// // Dodaj middleware do obsługi danych w formacie JSON
// app.use(express.json());

// // Dodaj router obsługujący endpointy związanymi z kontaktami
// app.use('/api/contacts', contactsRouter);

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Serwer działa. Używaj API na porcie: ${PORT}`);
// });

