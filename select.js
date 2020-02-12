//////////////////////////////////////////////////
// Nama file: select.js
//////////////////////////////////////////////////

var Client = require('mariasql');

var conn = new Client({
   host: 'localhost',
   user: 'budi',
   password: 'budi',
   db: 'nodedb'	// mengaktifkan database nodedb
});

// mendefinisikan perintah SQL yang akan dikirim
var sql = `SELECT * FROM buku`;

// mengirim perintah SQL
conn.query(sql, function (error, result) {
   if (error) {
      throw error;
   }
   // memproses nilai dari parameter result
   for (let i=0; i<result.length; i++) {
      let row = result[i]
      console.log('%s, %s, %s, %s', 
         row['buku_id'], 
         row['buku_judul'], 
         row['buku_penulis'], 
         row['buku_penerbit']
      );
   }
});

conn.end();  // memutus koneksi

