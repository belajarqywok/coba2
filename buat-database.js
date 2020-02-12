//////////////////////////////////////////////////
// Nama file: buat-database.js
//////////////////////////////////////////////////

var Client = require('mariasql');

var conn = new Client({
   host: 'localhost',
   user: 'budi',
   password: 'budi'
});

// mengirim perintah SQL
conn.query('CREATE DATABASE nodedb', function (error, result) {
   if (error) {
      console.log('Database nodedb gagal dibuat');
      throw error;
   }
   console.log('Database nodedb berhasil dibuat');
});

conn.end();  // memutus koneksi
