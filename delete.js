//////////////////////////////////////////////////
// Nama file: delete.js
//////////////////////////////////////////////////

var Client = require('mariasql');

var conn = new Client({
   host: 'localhost',
   user: 'budi',
   password: 'budi',
   db: 'nodedb'	// mengaktifkan database nodedb
});

// mendefinisikan perintah SQL yang akan dikirim
var sql = `DELETE FROM buku WHERE buku_id = 'B001'`;

// mengirim perintah SQL
conn.query(sql, function (error, result) {
   if (error) {
      console.log('Data gagal dihapus');
      throw error;
   }
   console.log('Data berhasil dihapus');
});

conn.end();  // memutus koneksi
