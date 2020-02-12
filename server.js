//////////////////////////////////////////////////
// Nama file: server.js
//////////////////////////////////////////////////

var http = require('http');
var Client = require('mariasql');
var pug = require('pug');
var qs = require('querystring');
var NodeSession = require('node-session');

var mainPug = './templates/main.pug';
var loginFormPug = './templates/loginform.pug';

var db = new Client({
   host: 'localhost',
   user: 'budi',
   password: 'budi',
   db: 'nodedb'
});

var session = new NodeSession({
   secret: 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD'
});

var server = http.createServer(function (req, res) {
   
   session.startSession(req, res, function () {
      if (req.url === '/') {
		 res.writeHead(200, {'Content-Type': 'text/html'});
         var template = pug.renderFile(loginFormPug);
         res.end(template);
      } else if (req.url === '/login' && req.method === 'POST') {	  
         var body = '';
		    
         req.on('data', function (data) { 
            body += data;
         });

         req.on('end', function () { 
            var form = qs.parse(body);
            var params = [
               form['user_id'],
               form['user_password']
            ];
            var sql = `SELECT COUNT(*) AS cnt FROM users 
                       WHERE
                          user_id = ? AND user_password = md5(?)`;
            db.query(sql, params, function (error, result) {
               if (error) throw error;
               var n = result[0]['cnt'];
               console.log('Nilai n: ' + n);
               if (n > 0) {
                  // login berhasil
                  req.session.put('user_id', params[0]);
                  // redirect ke halaman utama
                  res.writeHead(302,{'Location': '/main'});
                  res.end();
               } else {
				  res.writeHead(200, {'Content-Type': 'text/html'});
				  var template = pug.renderFile(loginFormPug, 
				     {msg: 'User ID atau password salah!'});
                  res.end(template);
               }                  
            });
         });
         
      } else if (req.url === '/main') {
         
         if (!req.session.has('user_id')) {
            // redirect ke form login
            res.writeHead(302,{'Location': '/'});
            res.end();
	     }
         
         var user_id = req.session.get('user_id');
         
         res.writeHead(200, {'Content-Type': 'text/html'});
         // menampilkan halaman utama         
         var template = pug.renderFile(mainPug, {user_id: user_id});
         res.end(template);
      } else if (req.url === '/logout') {
         if (req.session.has('user_id')) {
            req.session.forget('user_id');            
	     }
	     // redirect ke form login
         res.writeHead(302,{'Location': '/'});
         res.end();
      } else {
		 res.writeHead(200, {'Content-Type': 'text/html'});
         res.end('Halaman tidak ditemukan!');
      }   
   });      
});

server.listen(3000);
