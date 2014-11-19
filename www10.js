/**
 * Author : Sampath
 * Created by Sampath on 11/16/14.
 * Purpose : Testing
 * Description : Write JSON data to response header 4
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

//Only folders
function loadAlbumList(callback){
    fs.readdir('/home/test/node/08_11_2014/1/Test1/sampath/albums',function(err,fileList){
        if(err){
            callback(err);
            return;
        }
        var dirs_only = [];
        (function iterator(i){

            if(i >= fileList.length){
                callback(null,dirs_only);
                return;
            }

            fs.stat("/home/test/node/08_11_2014/1/Test1/sampath/albums",function(err,stats){
                if(err){
                    callback(err);
                    return;
                }
                if(stats.isDirectory()){
                    dirs_only.push(fileList[i]);
                }


                iterator(i + 1);

            });

        })(0);
    });
}

var s = http.createServer(handle_incoming_request);
s.listen(8080);