/**
 * Author : Sampath
 * Created by Sampath on 11/18/14.
 * Purpose : Testing
 * Description : Read a file in Node - use of async module
 */

exports.version = "0.1.0";
var fs = require('fs'),
    async = require('async');

exports.LoadFileContent = function(path,callback){
    var f;
    async.waterfall([

        //First call the file open function
        function(cb){
            fs.open(path,'r',cb)
        },

        //Check the file status
        function(handler,cb){
            f = handler;
            fs.fstat(f,cb);
        },

        //Check if file
        function(stats,cb){
            if(stats.isFile()){
                var b = new Buffer(10000);
                fs.read(f,b,0,10000,null,cb);
            }else{
                cb(make_error("Not a file","Can't load directory"));
            }
        },

        //If success resend back to the results - close the file , use of the callback function
        function(numberOfBytesRead,buffer,cb){
            fs.close(f,function(err){
                if(err){
                    callback(err);
                }else{
                    callback(null,buffer.toString('utf8',0,numberOfBytesRead));
                }
            });
        }

    ],
        //Final result collector
        function(err,results){
            callback(err,results);
        }

    );

};

//Make an error object
function make_error(err,msg){
    var e = new Error(msg);
    e.code = msg;
    return e;
}

