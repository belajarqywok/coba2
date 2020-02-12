//////////////////////////////////////////////////
// Nama file: update.js
//////////////////////////////////////////////////

var Client = require('mariasql');

var conn = new Client({
   host: 'localhost',
   user: 'budi',
   password: 'budi',
   db: 'nodedb'	// mengaktifkan database nodedb
});

// mendefinisikan perintah SQL yang akan dikirim
var sql = `
UPDATE buku
SET buku_judul = 'Professional Node.js',
    buku_penulis = 'Pedro Teixeira',
    buku_penerbit = 'Wrox'
WHERE buku_id = 'B001'
`;

// mengirim perintah SQL
conn.query(sql, function (error, result) {
   if (error) {
      console.log('Perubahan data gagal');
      throw error;
   }
   console.log('Perubahan data berhasil');
});

conn.end();  // memutus koneksi
