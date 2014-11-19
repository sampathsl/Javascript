/**
 * Author : Sampath
 * Created by Sampath on 11/17/14.
 * Purpose : Testing
 * Description : Write JSON data to response header 8
 * JSON data in Node
 * curl -i -X POST -H "Content-Type:application/json" -d '{"field1" : 123 , "field2" : "val 2"}' http://localhost:8080
 */

var http = require('http');

function handleIncomingRequest(req,res) {

    console.log('Incoming Request:(' + req.method + ") " + req.url);

    var jsonData = "";

    req.on("readable",function(){
        var d = req.read();
        if(typeof d == 'string')
            jsonData += d;
        else if(typeof d == 'object' && d instanceof Buffer)
            jsonData += d.toString('utf8');
    });

    req.on("end",function(){
        var out = '';
        if(!jsonData)
        jsonData = "I got noe JSON";
        else {
            var json;
            try {
                json = JSON.parse(jsonData);
            } catch (err) {
                console.log(err);
            }
            if (!json)
                out = "Invalid JSON";
            else
                out = "Valid JSON Data: " + jsonData;
        }
        res.end(out);
    });

}

var s = http.createServer(handleIncomingRequest);
s.listen(8080);