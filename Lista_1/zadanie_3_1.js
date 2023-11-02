var c = document.getElementById("myGraf");
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
    this.alpha -= num;
    return this;
}

turtle.dot = function(radius) {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, radius, 0, 2 * pi, false);
    this.ctx.fillStyle = this.pencolor;
    this.ctx.fill();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#000000';
    this.ctx.stroke();
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

function graph(n, l) {
    turtle.penDown();
    var alpha = 360 / n;
    for (let i = 0; i < n; i++) {
        turtle.dot(5);
        turtle.forward(l);
        turtle.turn(180 / n);
        for (let j = 0; j < n - 1; j++) {
            turtle.turn((180 - 360 / n) / (n - 2));
            var step = l * Math.sin((j + 1) * pi / n) / Math.sin(pi / n);
            turtle.forward(step);
            turtle.backward(step);
        };
        turtle.turn(alpha - 180);
    };
}

turtle.ctx = c.getContext("2d");

function drawGraph() {
    var c = document.getElementById("myGraf");
    const vertexCount = parseInt(document.getElementById("vertexCount").value);
    graph(vertexCount, 100);
}


