/**
 * Author : Sampath
 * Created by Sampath on 11/9/14.
 * Purpose : Testing
 * Description : Simple Node file read example 3
 */

var fs = require("fs");

function FileObject(){
    this.fileName = null;
    this.exists = function(callback){
        var self = this;
        fs.open(self.fileName,'r',function(err,handler){
            if(err){
                console.log(self.fileName + " file does NOT exists");
                callback(false);
            }else{
                console.log(self.fileName + " file does INDEED exists");
                callback(true);
                fs.close(handler);
            }
        });
    }
}

var fo = new FileObject();
fo.fileName = "sdanfkshfj";

fo.exists(function(doesFileExists) {
    console.log("Results : " + doesFileExists);
});