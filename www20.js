/**
 * Author : Sampath
 * Created by Sampath on 11/18/14.
 * Purpose : Testing
 * Description : Read a file in Node
 */

exports.version = "0.1.0";
var fs = require('fs');
exports.LoadFileContent = function(path,callback){
    fs.open(path,'r',function(err,f){
        if(err){
            callback(err);
            return;
        }else if(!f){
            callback(make_error("Invalid data","Bad file handle from fs.open"));
            return;
        }
        fs.fstat(f,function(err,stats){
            if(err){
                callback(err);
                return;
            }
            if(stats.isFile()){
                var b = new Buffer(10000);
                fs.read(f,b,0,10000,null,function(err,br,buff){
                    if(err){
                        callback(err);
                        return;
                    }
                    fs.close(f,function(err){
                        if(err){
                            callback(err);
                            return;
                        }
                        callback(null,b.toString('utf8',0,br));
                    });
                });
            }else{
                callback(make_error("Not a file","Can't load directory"));
                return;
            }
        });
    });
};

function make_error(err,msg){
    var e = new Error(msg);
    e.code = msg;
    return e;
}

