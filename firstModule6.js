/**
 * Author : Sampath
 * Created by Sampath on 11/19/14.
 * Purpose : Testing
 * Description : Read a file in Node - use of async module
 */

var www22 = require('./www22');

www22.LoadFileContent("/home/test/node/08_11_2014/1/Test1/bin/test.txt",function(err,contents){
    if(err){
        console.log(err);
    }else{
        console.log(contents);
    }
});

/*www22.LoadFileContent("/home/test/workspace",function(err,contents){
    if(err){
        console.log(err);
        //console.log(contents);
    }else{
        console.log(contents);
    }
});*/


