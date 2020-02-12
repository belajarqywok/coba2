//////////////////////////////////////////////////
// Nama file: koneksi1.js
//////////////////////////////////////////////////

var Client = require('mariasql');

// membuat objek koneksi
var conn = new Client({
   host: 'localhost',
   user: 'budi',	// ubah dengan username Anda
   password: 'budi'	// ubah dengan password Anda
});

// mengirim perintah SQL
conn.query('SHOW DATABASES', function (error, result) {
   if (error) {
      console.log('Koneksi ke server MariaDB gagal');
      throw error;
   }
   console.log('Koneksi ke server MariaDB berhasil\n');
   console.log('Hasil query:');
   console.log(result);   
});

conn.end();  // memutus koneksi
