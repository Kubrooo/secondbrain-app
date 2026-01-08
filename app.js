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
    console.error("ERROR PRISMA:", error); 
    
    res.status(500).json({ error: 'Gagal membuat catatan' });
  }
});

// GET /notes
app.get('/notes', async (req, res) => {
  try {
    const notes = await prisma.note.findMany()
    
    res.status(200).json(notes)
  } catch {
    req.status(500).json({ error: 'Gagal mendapatkan catatan '})
  }
})

// PUT /notes/:id
app.put('/notes/:id', async (req,res) => {
  const { id } = req.params;
  const { title, content } = req.body

  try{
    const updateNote = await prisma.note.update({
      where: {
        id: parseInt(id)
      },
      data: {
        title: title,
        content: content,
      },
    });

    res.status(200).json(updateNote)
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengupdate catatan'})
  }
})

// DELETE /notes/:id
app.delete('/notes/:id', async (req, res) => {
  const { id } = req.params;

  try{
    await prisma.note.delete({
      where:{
        id: parseInt(id)
      }
    })

    res.status(200).json({ message: 'Catatan berhasil dihapus'})
  } catch ( error ) {
    res.status(500).json({ error: 'Gagal menghapus catatan'})
  }
})

module.exports = app;