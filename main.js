const http = require('http');
const fs = require('fs');

var server = http.createServer(function(request, response) {
    var method = request.method;
    var url = request.url;
    //akceptuję tylko GET
    if (method !== 'GET') {
        response.statusCode = 404;
        console.log('wrong request method');
        response.end();
    }
    //deklaruję zawartość portfolio i zmienną, która przechowa projekt dopasowoany z adresu html
    var directory = ['/projects/hangMan/', '/projects/kittyWebsite/', '/projects/ticker/', '/projects/spotifySearch/'];
    var directoryName;
    //dopasowanie zawartości portfolio do adresu
    if (directory.some(function(item) {
        if (url.startsWith(item)) {
            directoryName = item;
            return true;
        }
    }))
    {
        var targetFile = url.replace(directoryName, '');
        if (targetFile == '') {
            targetFile = 'index.html';
        }
        var targetDirectory = __dirname + directoryName;
        fs.readdir(targetDirectory, function(err, items) {
            console.log(items);
            if (err) {
                console.log('error');
            }
            if (items.indexOf(targetFile) == -1) {
                response.statusCode = 404;
                response.end();
                return;
            }
            response.statusCode = 200;
            if (targetFile.slice(-5) == '.html') {
                response.setHeader('Content-Type', 'text/html');
            }
            if (targetFile.slice(-4) == '.css') {
                response.setHeader('Content-Type', 'text/css');
            }
            if (targetFile.slice(-3) == '.js') {
                response.setHeader('Content-Type', 'text/javascript');
            }
            if (targetFile.slice(-5) == '.json') {
                response.setHeader('Content-Type', 'application/json');
            }
            console.log(targetFile);
            fs.createReadStream(targetDirectory + targetFile).pipe(response).on('error', function (err) {
                console.log(err);
                response.statusCode = 500;
                response.end();
            });
        });
    } else {
        response.statusCode = 404;
        response.end();
    }
}).listen(8080);
