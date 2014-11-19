/**
 * Author : Sampath
 * Created by Sampath on 11/9/14.
 * Purpose : Testing
 * Description : Investigate JS variables
 */

function Shape(){}

Shape.prototype.X = 0;
Shape.prototype.Y = 0;

Shape.prototype.move = function (x,y){
    this.X = x;
    this.Y = y;
};

Shape.prototype.distanceFromOrigin = function(){
    return Math.sqrt(this.X*this.Y)
};

Shape.prototype.area = function(){
    throw new Error("Need a 2d form")
};

var  s = new Shape();
s.move(10,10);
console.log(s.distanceFromOrigin());



function Square(){}
Square.prototype.__proto__ = Shape.prototype
Square.prototype.Width = 0;

Square.prototype.area = function(){
    return this.Width * this.Width;
};

var sq = new Square();
sq.move(4,4);
sq.Width = 15;
console.log(sq.distanceFromOrigin());
console.log(sq.area());

function Rectangle(){}
Rectangle.prototype.__proto__ = Square.prototype
Rectangle.prototype.Height = 0;

Rectangle.prototype.area = function(){
    return this.Width * this.Height;
};

var rc = new Rectangle();
rc.move(-4,-5);
rc.Width = 15;
rc.Height = 10;
console.log(rc.distanceFromOrigin());
console.log(rc.area());

console.log(sq instanceof Square);
console.log(sq instanceof Shape);
console.log(sq instanceof Rectangle);
console.log(rc instanceof Rectangle);
console.log(rc instanceof Square);
console.log(rc instanceof Shape);