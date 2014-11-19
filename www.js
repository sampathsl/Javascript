/**
 * Author : Sampath
 * Created by Sampath on 11/18/14.
 * Purpose : Testing
 * Description : Read a file in Node - File Streams
 */

var fs = require('fs');

function loadFileContents(fileName,callBack){
    var rs = fs.createReadStream(fileName);
    var fileContents = '';
    rs.on('readable',function(){
        var d = rs.read();
        if(d){
            if(typeof d == 'string'){
                fileContents += d;
            }else if(typeof d == 'object' && d instanceof Buffer){
                fileContents += d.toString('utf8');
            }
        }
    });

    rs.on('end',function(){
        callBack(null,fileContents);
    });

    rs.on('error',function(err){
        console.log('Got Error!');
        callBack(err);
    });
}

loadFileContents('/home/test/node/08_11_2014/1/Test1/bin/test.txt',function(err,results){
    if(err){
        console.log(err);
    }else{
        console.log(results);
    }
});

/*
loadFileContents('/home/test/node/08_11_2014/1/Test1/bin/test1.txt',function(err,results){
    if(err){
        console.log(err);
    }else{
        console.log(results);
    }
});
*/
