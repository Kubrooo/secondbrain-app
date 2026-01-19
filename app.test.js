const request = require('supertest');
const app = require('./app'); // Kita import app yang belum di-listen

describe('GET /', () => {
  it('seharusnya mengembalikan status 200 dan JSON health check', async () => {
    const response = await request(app).get('/');
    
    // 1. Cek status code tetap 200
    expect(response.statusCode).toBe(200);

    // 2. Cek tipe kontennya JSON (bukan text lagi)
    expect(response.headers['content-type']).toMatch(/json/);

    // 3. Cek isinya mengandung properti yang kita buat tadi
    expect(response.body.status).toBe('Success');
    expect(response.body.message).toBe('SecondBrain API is running');
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

describe('GET /notes', () => {
  it('seharusnya mengembalikan semua catatan', async () => {
    // 1. Kirim request GET ke endpoint /notes
    const response = await request(app).get('/notes');

    // 2. Ekspektasi: Status 200 (OK)
    expect(response.statusCode).toBe(200);

    // 3. Ekspektasi: Hasilnya harus berupa Array (Daftar catatan)
    // Walaupun kosong, tetap harus array []
    expect(Array.isArray(response.body)).toBe(true);
  });
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

describe('DELETE /notes/:id', () => {
  it('seharusnya bisa menghapus catatan', async () => {
    // 1. Buat dulu catatan dummy untuk dihapus
    const createResponse = await request(app).post('/notes').send({
      title: "Mau Dihapus",
      content: "Jangan rindu, berat. Biar aku saja."
    });
    
    const noteId = createResponse.body.id;

    // 2. Kirim request DELETE
    const deleteResponse = await request(app).delete(`/notes/${noteId}`);

    // 3. Ekspektasi: Status 200 dan pesan konfirmasi
    expect(deleteResponse.statusCode).toBe(200);
    expect(deleteResponse.body.message).toBe("Catatan berhasil dihapus");
  });
});

});