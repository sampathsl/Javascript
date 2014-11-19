/**
 * Author : Sampath
 * Created by Sampath on 11/17/14.
 * Purpose : Testing
 * Description : My first node module
 * Pattern : Factory pattern - uses for writing modules
 */

var greeter = require('./firstModule2');

var g = greeter.createGreeter('de');
console.log(g.greet());
console.log(greeter.helloWorld('en'));
console.log(greeter.goodbye('en'));
