var c = document.getElementById("myCanvas");
const pi = Math.PI;
var turtle = {
    x: c.width/2,
    y: c.height,
    alpha: 0,
    pencolor: "#006400",
    pen: false,
    lineWidth: 1
}

turtle.penDown = function() {
    this.pen = true
}

turtle.penUp = function() {
    this.pen = false
}

turtle.forward = function(d) {
    var a = this.x;
    var b = this.y;
    this.x = a + d * Math.cos(this.alpha * 2 * pi / 360);
    this.y = b + d * Math.sin(this.alpha * 2 * pi / 360);
    if (this.pen) {
        this.ctx.beginPath();
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.pencolor;
        this.ctx.moveTo(a, b);
        this.ctx.lineTo(this.x, this.y);
        this.ctx.stroke();
    }else {
        this.ctx.moveTo(this.x, this.y);
    }
    return this;
}

turtle.backward = function(d) {
    this.forward(-d);
    return this;
}

turtle.turn = function(num) {
    this.alpha += num;
    return this;
}

turtle.penWidth = function(num) {
    this.lineWidth = num;
    return this;
}

turtle.position = function(a, b) {
    this.x = a;
    this.y = c.height - b;
    return this;
}

turtle.ctx = c.getContext("2d");

turtle.penDown();
turtle.position(250,150);
turtle.forward(100);
turtle.turn(270);
turtle.forward(100);
turtle.turn(270);
turtle.forward(100);
turtle.turn(-90);
turtle.forward(100);

turtle.position(450,300);
turtle.pencolor = "#FF4500";
turtle.penWidth(5);
turtle.turn(90);
turtle.forward(100);
turtle.turn(120);
turtle.forward(100);
turtle.turn(120);
turtle.forward(100);

turtle.penUp();
turtle.penWidth(1);
turtle.turn(120);
turtle.backward(-250);
turtle.pencolor = "#0000FF";
turtle.penDown();
for (let i = 0; i<12; i++) {
    turtle.forward(50);
    turtle.turn(30);
}
