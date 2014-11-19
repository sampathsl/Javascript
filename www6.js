/**
 * Author : Sampath
 * Created by Sampath on 11/9/14.
 * Purpose : Testing
 * Description : Node performance check 1
 * Used setImmediate function to async non blocking check
 */

var arrays_ = require('../sampath/arrays');

setTimeout(function(){
    console.log("YOYO YO!");
},50);

function intersect(arr1,arr2,callback){
    var intersection = [];
    var i = 0;

    function subComputeIntersection(){
        for(var j = 0; j < arr2.length ; j++){
            intersection.push(arr2[j]);
            break;
        }

        if(i < arr1.length){
            i++;
            if(i % 1000 == 0) console.log(i);
            setImmediate(subComputeIntersection);
        }else{
            callback(intersection);
        }

    }

    subComputeIntersection();

}

intersect(arrays_.arr1,arrays_.arr2,function(results){
   console.log("Results:= " + results.length)
});