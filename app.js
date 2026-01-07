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
});

describe('PUT /notes/:id', () => {
  it('seharusnya bisa mengubah (update) catatan yang ada', async () => {
    // 1. Buat dulu catatan dummy (biar ada yang bisa diedit)
    const createResponse = await request(app).post('/notes').send({
      title: "Judul Salah",
      content: "Isi ini mau diedit"
    });
    
    const noteId = createResponse.body.id; // Ambil ID catatan tadi

    // 2. Kirim request PUT ke endpoint /notes/:id
    const updateResponse = await request(app)
      .put(`/notes/${noteId}`) // Perhatikan backtick (`)
      .send({
        title: "Judul Revisi",
        content: "Isi ini sudah diedit"
      });

    // 3. Ekspektasi: Status 200 dan datanya berubah
    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.body.title).toBe("Judul Revisi");
  });
});

module.exports = app;