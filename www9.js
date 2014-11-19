/**
 * Author : Sampath
 * Created by Sampath on 11/10/14.
 * Purpose : Testing
 * Description : Write JSON data to response header 3
 * Creating photo album app
 */

var http = require('http');
var fs = require('fs');

function handle_incoming_request(req,res){

    console.log('Incoming Request:('+req.method+") "+req.url);

    loadAlbumList(function(err,albums){
        if(err != null){
            res.writeHead(503,{"Content-Type" : "application/json"});
            res.end(JSON.stringify({error:"file_error",message:err.message}) + "\n");
            return;
        }

        res.writeHead(200,{'Content-Type' : 'application/json'});
        res.end(JSON.stringify( {error: "no error" , data : {albums:albums} } ) + "\n");

    });

}

function loadAlbumList(callback){
    fs.readdir('/home/test/node/08_11_2014/1/Test1/sampath/albums',function(err,fileList){
        callback(err,fileList);
    });
}

var s = http.createServer(handle_incoming_request);
s.listen(8080);