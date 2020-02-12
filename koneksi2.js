//////////////////////////////////////////////////
// Nama file: koneksi2.js
//////////////////////////////////////////////////

var Client = require('mariasql');

// membuat objek koneksi
var conn = new Client({
   host: 'localhost',
   user: 'budi',
   password: 'budi',
   db: 'mysql'	// nama database
});

// mengirim perintah SQL
conn.query('SHOW TABLES', function (error, result) {
   if (error) {
      console.log('Koneksi ke database MYSQL gagal');
      throw error;
   }
   console.log('Koneksi ke database MYSQL berhasil\n');
   console.log('Hasil query:');
   console.log(result);   
});

conn.end();  // memutus koneksi
