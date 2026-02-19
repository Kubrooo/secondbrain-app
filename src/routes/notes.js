const express = require("express");
const { PrismaClient } = require("@prisma/client");
const authenticateToken = require("../middleware/auth");

const router = express.Router();
const prisma = new PrismaClient();

router.use(authenticateToken);

// GET All Notes (Milik User Login)
router.get("/", async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: "Gagal mendapatkan catatan" });
  }
});

// GET Single Note
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const note = await prisma.note.findFirst({
      where: { 
        id: parseInt(id),
        userId: req.user.id
      },
    });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Error mengambil data" });
  }
});

// POST Note
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  try {
    const newNote = await prisma.note.create({
      data: {
        title,
        content,
        userId: req.user.id,
      },
    });
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ error: "Gagal membuat catatan" });
  }
});

// PUT Note
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const count = await prisma.note.count({ where: { id: parseInt(id), userId: req.user.id }});
    if(count === 0) return res.status(404).json({error: "Catatan tidak ditemukan/bukan milikmu"});

    const updateNote = await prisma.note.update({
      where: { id: parseInt(id) },
      data: { title, content },
    });
    res.status(200).json(updateNote);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengupdate catatan" });
  }
});

// DELETE Note
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const count = await prisma.note.count({ where: { id: parseInt(id), userId: req.user.id }});
    if(count === 0) return res.status(404).json({error: "Catatan tidak ditemukan/bukan milikmu"});

    await prisma.note.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Catatan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: "Gagal menghapus catatan" });
  }
});

module.exports = router;