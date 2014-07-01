var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');
var crypto = require('crypto');
var bodyParser = require('body-parser');

var app = express();
var path = __dirname + '/App/public';
var facade = require('./App/Facade');

var sha1 = crypto.createHash('sha1');
var hash = null;
var mb = 1024 * 1024;

sha1.update('polaroid luxembourg photo club'); // TODO: Zeile vor Implementierung ab�ndern.
hash = sha1.digest('hex');

app.set('port', 8080);
app.set('host', 'localhost');

app.use(require('connect-multiparty')({
    uploadDir: __dirname + '/App/temp'
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('cookie-parser')(hash));
app.use(require('cookie-session')({
    secret: hash
}));
app.use(require('express-session')({
    secret: hash,
    resave: true,
    saveUninitialized: true
    /*cookie: { secure: true }*/
}));
//app.use(app.router);

// https server
var options = {
    key: fs.readFileSync('./cert/server.key'),
    cert: fs.readFileSync('./cert/server.crt')
};
    
facade(app);
app.use(express.static(path));
app.set('https-server', https.createServer(options, app).listen(43443, app.get('host')));
app.set('http-server', http.createServer(app).listen(8080, app.get('host')));
console.log('Webserver started.');
console.log('Press any key to end this process.');

var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', function (cmd) {
    process.exit();
});
