
const http = require('http');
const path = require('path');
const fs = require('fs');
const env = process.env.NODE_ENV;
const fileName = 'index.html';
const documentRoot = path.parse(__dirname).dir;
let server= http.createServer(function(req,res){
    let url = (req.url != '/') ? req.url : fileName; 
    let file = path.join(documentRoot, url);
    console.log('here:',file);
    fs.readFile( file , function(err,data){
        if(err){
            res.writeHeader(404,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write('<h1>404 NOT FOUND</h1><p>你要找的页面不存在</p>'+'<p>'+err.code+'</p>');
            res.end();
        }else{
            res.writeHeader(200,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write(data);
            res.end();

        }

    });

}).listen(8080);

console.log('This server is listening on: localhost:3000')