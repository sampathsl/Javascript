/**
 * Author : Sampath
 * Created by Sampath on 11/17/14.
 * Purpose : Testing
 * Description : Write JSON data to response header 9
 * Data streams (request and response) , JSON data in Node , POST data check
 * curl -i -X POST --data 'field1=123&field2=val 2' http://localhost:8080
 */


var http = require('http');
var qs = require('querystring');

function handleIncomingRequest(req, res) {

    console.log('Incoming Request:(' + req.method + ") " + req.url);

    var formData = "";

    req.on("readable", function () {
        var d = req.read();
        if (typeof d == 'string')
            formData += d;
        else if (typeof d == 'object' && d instanceof Buffer)
            formData += d.toString('utf8');
    });

    req.on("end", function () {
        var out = '';
        if (!formData)
            formData = "I got noe form data";
        else {
            var obj = qs.parse(formData);
            if (!obj)
                out = "Form data didn't parse";
            else
                out = "I got form data: " + JSON.stringify(obj);
        }
        res.end(out);
    });

}

var s = http.createServer(handleIncomingRequest);
s.listen(8080);