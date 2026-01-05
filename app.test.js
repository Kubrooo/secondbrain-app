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