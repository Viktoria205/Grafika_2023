var c = document.getElementById("Koch");
var size = 100; 
var order = 3; 
const pi = Math.PI;

var turtle = {
    x: c.width/2,
    y: c.height/2,
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

function drawKochFlake(turtle, order, size) {
    if (order === 0) {
        turtle.forward(size);
    } else {
        drawKochFlake(turtle, order - 1, size / 3);
        turtle.turn(60);
        drawKochFlake(turtle, order - 1, size / 3);
        turtle.turn(-120);
        drawKochFlake(turtle, order - 1, size / 3);
        turtle.turn(60);
        drawKochFlake(turtle, order - 1, size / 3);
    }
}

function updateOrder() {
    order = parseInt(document.getElementById("order").value);
    turtle.ctx.clearRect(0, 0, c.width, c.height);
    turtle.position(c.width/2, c.height/2);
    for (var i = 0; i < 6; i++) {
        drawKochFlake(turtle, order, size);
        turtle.turn(-60);
    }
}

function updateSize() {
    size = parseInt(document.getElementById("size").value);
    turtle.ctx.clearRect(0, 0, c.width, c.height);
    turtle.position(c.width/2, c.height/2);
    for (var i = 0; i < 6; i++) {
        drawKochFlake(turtle, order, size);
        turtle.turn(-60);
    }
}

function updatePenColor() {
    penColor = document.getElementById("colorPicker").value;
    turtle.ctx.clearRect(0, 0, c.width, c.height);
    turtle.position(c.width/2, c.height/2);
    turtle.pencolor = penColor;
    for (var i = 0; i < 6; i++) {
        drawKochFlake(turtle, order, size);
        turtle.turn(-60);
    }
}

turtle.penDown();
for (var i = 0; i < 6; i++) {
    drawKochFlake(turtle, order, size);
    turtle.turn(-60);
}




