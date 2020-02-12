//////////////////////////////////////////////////
// Nama file: koneksi.js
//////////////////////////////////////////////////

var Client = require('mariasql');

// langkah 1: membuat objek koneksi
var conn = new Client({
   host: 'localhost',
   user: 'budi',	// ubah dengan username Anda
   password: 'budi'	// ubah dengan password Anda
});

// langkah 2: memanggil metode connect()
conn.connect(function (error) {
   if (error) {
      console.log('Koneksi ke server MariaDB gagal');
      throw error;
   }
   console.log('Koneksi ke server MariaDB berhasil');
   conn.end();  // memutus koneksi
});
