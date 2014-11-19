/**
 * Author : Sampath
 * Created by Sampath on 11/18/14.
 * Purpose : Testing
 * Description : Read a file in Node
 */

var www20 = require('./www20');

/*www20.LoadFileContent("/home/test/node/08_11_2014/1/Test1/bin/test.txt",function(err,contents){
    if(err){
        console.log(err);
    }else{
        console.log(contents);
    }
});*/

www20.LoadFileContent("/home/test/workspace",function(err,contents){
    if(err){
        console.log(err);
    }else{
        console.log(contents);
    }
});


