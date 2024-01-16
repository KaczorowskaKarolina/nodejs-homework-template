// app.mjs

import express from 'express';
const app = express();
import contactsRouter from './routes/api/contacts.mjs';

app.use(express.json());

app.use('/api/contacts', contactsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serwer działa. Używaj API na porcie: ${PORT}`);
});
