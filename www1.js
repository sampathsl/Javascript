/**
 * Author : Sampath
 * Created by Sampath on 11/8/14.
 * Purpose : Testing
 * Description : First simple server
 */

var http = require('http');

function requestHander(req,res){
    var body = "Hey, Thanks for calling!";
    var contentLength = body.lengths;
    res.writeHead(200,{
        'Content-Type': "text/plain",
        'Content-Length': contentLength
    })
    res.end(body)
}

var s = http.createServer(requestHander);
s.listen(8080)