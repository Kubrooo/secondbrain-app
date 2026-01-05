const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(express.json());

app.get('/', (req,res) => {
    res.status(200).send('Halo! Backend SecondBrain sudah jalan.');
});

// POST /notes
app.post('/notes', async (req, res) => {
  // DEBUG 1: Cek apakah data masuk?
  console.log("DATA MASUK:", req.body); 
  
  const { title, content } = req.body;

  try {
    const newNote = await prisma.note.create({
      data: {
        title: title,
        content: content,
      },
    });
    res.status(201).json(newNote);
  } catch (error) {
    // DEBUG 2: Cek apa errornya?
    console.error("ERROR PRISMA:", error); 
    
    res.status(500).json({ error: 'Gagal membuat catatan' });
  }
});

module.exports = app;