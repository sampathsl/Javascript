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
                var content = '';
                var b = new Buffer(1000);
                var bytesRead = -1;
                async.whilst(
                    //ending the while
                    function(){return bytesRead != 0;},
                    //file read function by 1000 chunks per each
                    function(cb){
                        fs.read(f,b,0,1000,null,function(err,br,buffer){
                            if(err){
                                cb(err);
                                return;
                            }
                            bytesRead = br;
                            if(br > 0) {
                                content += b.toString('utf8', 0, br);
                            }
                            cb(null);
                        });
                    },
                    //async inner waterfall final function - giving the results of the while loop
                    function(err,reults){
                        cb(err,content);
                    }
                );
            }else{
                //cb('Not a file',"Can not read it!");
                cb(make_error("Not a file","Can't load directory"));
            }
        },

        //if success resend back to the results - close the file , use of the callback function
        function(fileContents,cb){
            fs.close(f,function(err){
                if(err){
                    callback(err);
                }else{
                    callback(null,fileContents);
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

