/**
 * Author : Sampath
 * Created by Sampath on 11/9/14.
 * Purpose : Testing
 * Description : Simple Node file read example 2
 */

var fs = require("fs")
fs.open('/home/test/node/08_11_2014/1/Test1/bin/test.txt','r',function(err,handler){

    if(err == null ) {
        var f = handler;
        var b = new Buffer(1000000);

        fs.read(f, b, 0, 10000, 1, function (err, bytesRead, buffere) {
            console.log(b.toString("utf8", 0, bytesRead));
            fs.close(f, function (err, handler) {
                if(err != null ) {
                    console.log("err:" + err);
                    console.log("handler:" + handler);
                }
            });
        });
    }else{
        console.log("GOT ERROR!:");
    }

});