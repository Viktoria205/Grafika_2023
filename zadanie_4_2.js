var c = document.getElementById("Sierpinski");
var size = 400;
var order = 3; 
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
    this.alpha -= num;
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

function drawSierpinskiTriangle(turtle, order, size) {
    if (order === 0) {
        for (let i = 0; i < 3; i++) {
            turtle.forward(size);
            turtle.turn(120);
        }
    } else {
        drawSierpinskiTriangle(turtle, order - 1, size / 2);
        turtle.forward(size / 2);
        drawSierpinskiTriangle(turtle, order - 1, size / 2);
        turtle.backward(size / 2);
        turtle.turn(60);
        turtle.forward(size / 2);
        turtle.turn(-60);
        drawSierpinskiTriangle(turtle, order - 1, size / 2);
        turtle.turn(60);
        turtle.backward(size / 2);
        turtle.turn(-60);
    }
}

function updateOrder() {
    order = parseInt(document.getElementById("order").value);
    turtle.ctx.clearRect(0, 0, c.width, c.height);
    turtle.position(c.width/2, 0);
    drawSierpinskiTriangle(turtle, order, size);
}

function updateSize() {
    size = parseInt(document.getElementById("size").value);
    turtle.ctx.clearRect(0, 0, c.width, c.height);
    turtle.position(c.width/2, 0);
    drawSierpinskiTriangle(turtle, order, size);
}

function updatePenColor() {
    penColor = document.getElementById("colorPicker").value;
    turtle.ctx.clearRect(0, 0, c.width, c.height);
    turtle.position(c.width/2, 0);
    turtle.pencolor = penColor;
    drawSierpinskiTriangle(turtle, order, size);
}

turtle.penDown();
drawSierpinskiTriangle(turtle, order, size);