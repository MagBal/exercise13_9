var formidable = require('formidable');
var fs = require('fs');

var fileName;

exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        response.writeHead(200, {
            "Content-Type": "text/html"
        });
        fileName = fields.title;
        if (fileName.length == 0) {
            fileName = files.upload.name;
        }
        response.write("received image: " + fileName + "<br/>");
        fs.renameSync(files.upload.path, fileName);
        response.write("<img src='/show' />");
        response.end();
    });
}

exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/start.html', function(err, html) {
        response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });
        if(err) throw err;
        response.write(html);
        response.end();
    });
}

exports.error = function(request, response) {
    console.log("Nie wiem co robić.");
    response.write("404 :(");
    response.end();
}

exports.show = function(request, response) {
    fs.readFile(fileName, "binary", function(err, file) {
        response.writeHead(200, {
            "Content-Type": "image/jpg"
        });
        if(err) throw err;
        response.write(file, "binary");
        response.end();
    });
}