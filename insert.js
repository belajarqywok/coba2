//////////////////////////////////////////////////
// Nama file: insert.js
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
INSERT INTO buku
VALUES('B001','Practical Node.js','Azat Mardan','Apress')
`;

// mengirim perintah SQL
conn.query(sql, function (error, result) {
   if (error) {
      console.log('Penambahan data gagal');
      throw error;
   }
   console.log('Penambahan data berhasil');
});

conn.end();  // memutus koneksi
