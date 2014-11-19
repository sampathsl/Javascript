/**
 * Author : Sampath
 * Created by Sampath on 11/16/14.
 * Purpose : Testing
 * Description : Write JSON data to response header 7
 * Creating photo album app
 * Extract url parameters - page , page_size
 * curl -i -X GET 'http://localhost:8080/albums/a.json?page=2&page_size=500'
 * curl -i -X GET 'http://localhost:8080/albums/a.json?page=0&page_size=2'
 * a is an album folder
 */

var http = require('http'),
    url = require('url'),
    fs = require('fs');

var albumDirectoryPath = '/home/test/node/08_11_2014/1/Test1/sampath/albums/';

function handleIncomingRequest(req,res) {

    console.log('Incoming Request:(' + req.method + ") " + req.url);
    console.log('req.url.substr(0,7): ' + req.url.substr(0,7));
    console.log('req.url.substr(req.url.length - 5): ' + req.url.substr(req.url.length - 5));

    req.parsedUrl = url.parse(req.url,true);
    console.log('req.parsedUrl: ' +  req.parsedUrl);
    var coreUrl = req.parsedUrl.pathname;
    console.log('coreUrl: ' +  coreUrl);

    if (coreUrl == '/albums.json') {
        handleLoadAlbums(req,res)
    }else if(coreUrl.substr(0,7) == '/albums' && coreUrl.substr(coreUrl.length - 5) == ".json"){
        handleGetAlbum(req,res);
    }else{
        res.writeHead(404,{"Content-Type" : "application/json"});
        res.end(JSON.stringify({error:"error",message:"error"}) + "\n");
    }

}

function handleLoadAlbums(req,res){

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

//Only looks for folders
function loadAlbumList(callback){
    fs.readdir(albumDirectoryPath,function(err,fileList){
        if(err){
            callback(err);
            return;
        }
        var dirsOnly = [];
        (function iterator(i){

            if(i >= fileList.length){
                callback(null,dirsOnly);
                return;
            }

            fs.stat(albumDirectoryPath,function(err,stats){
                if(err){
                    callback(err);
                    return;
                }
                if(stats.isDirectory()){
                    dirsOnly.push(fileList[i]);
                }
                iterator(i + 1);
            });

        })(0);
    });
}

function handleGetAlbum(req,res) {

    var coreUrl = req.parsedUrl.pathname;
    var page = req.parsedUrl.query.page;
    console.log("page: "+page);
    var pageSize = req.parsedUrl.query.page_size;
    console.log("pageSize: "+pageSize);
    var albumName = coreUrl.substr(7,coreUrl.length - 12);
    if(isNaN(page) || page <= 0) page = 0;
    if(isNaN(pageSize) || pageSize <= 0) pageSize = 250;

    loadAlbum(albumName,page,pageSize,function(err,photos){

        if(err != null){
            res.writeHead(503,{"Content-Type" : "application/json"});
            res.end(JSON.stringify({error:"file_error",message:err.message}) + "\n");
            return;
        }

        res.writeHead(200,{'Content-Type' : 'application/json'});
        res.end(JSON.stringify( {error: "no error" ,  data : {album : {albumName:albumName , photos:photos} } }) + "\n");

    });

}

//Only looks for files
function loadAlbum(albumName,page,pageSize,callback){
    fs.readdir(albumDirectoryPath + albumName ,function(err,fileList){
        if(err){
            callback(err);
            return;
        }
        var filesOnly = [];
        (function iterator(i){

            if(i >= fileList.length){
                var photos = filesOnly.splice(page*pageSize,pageSize);
                callback(null,photos);
                return;
            }

            fs.stat(albumDirectoryPath + albumName,function(err,stats){
                if(err){
                    callback(err);
                    return;
                }
                if(stats.isDirectory()){
                    filesOnly.push(fileList[i]);
                }
                iterator(i + 1);
            });

        })(0);
    });
}

var s = http.createServer(handleIncomingRequest);
s.listen(8080);