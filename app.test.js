const request = require('supertest');
const app = require('./app'); // Kita import app yang belum di-listen

// Grouping test dengan 'describe'
describe('GET /', () => {
  
  // Test case spesifik dengan 'it'
  it('seharusnya mengembalikan status 200 dan pesan Halo', async () => {
    
    // Kirim request palsu ke app
    const response = await request(app).get('/');
    
    // Assertions (Pengecekan)
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Halo! Backend SecondBrain sudah jalan.');
  });

});

describe('POST /notes', () => {
  it('seharusnya bisa membuat catatan baru', async () => {
    // 1. Data dummy yang mau kita kirim
    const newNote = {
      title: "Ide Project SecondBrain",
      content: "Pakai Stack MERN biar modern."
    };

    // 2. Kirim request POST ke endpoint /notes
    const response = await request(app)
      .post('/notes')
      .send(newNote);

    // 3. Ekspektasi: Harusnya dapat status 201 (Created)
    // dan responnya mengandung data yang sama
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newNote.title);
  });
});