/**
 * Author : Sampath
 * Created by Sampath on 11/17/14.
 * Purpose : Testing
 * Description : My first node module
 * Constructor pattern - down side : Expose only one class from module
 */

var Greeter = require('./firstModule3');

//Constructor pattern
var g = new Greeter('fr');
console.log(g.greet());
