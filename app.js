// app.js
import express from 'express';
import dotenv from 'dotenv';
import contactsRouter from '#routes/api/contacts.js';
import usersRouter from '#routes/api/users.js';
import path from 'path';
import multer from 'multer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Konfiguracja Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/avatars'); // Określenie folderu docelowego dla awatarów
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unikalna nazwa pliku
  },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rozdawanie plików statycznych
const currentModuleFile = new URL(import.meta.url).pathname;
const currentModuleDir = path.dirname(currentModuleFile);
app.use('/avatars', express.static(path.join(currentModuleDir, 'public', 'avatars')));

// Dodanie middleware Multer do ładowania awatarów
app.post('/api/users/upload-avatar', upload.single('avatar'), (req, res) => {
  res.status(200).json({ message: 'Avatar uploaded successfully' });
});

app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running. Use the API on port: ${PORT}`);
});
