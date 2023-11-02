var c = document.getElementById("myCanvas");
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


function click_() {
    var l = document.getElementById("length").value;
    var n = document.getElementById("number").value;
    var alpha = 180 - 180 * (n - 2) / n;
    turtle.penDown();
    turtle.position(c.width / 2, c.height / 2);
    for (let i = 0; i < n; i++) {
        turtle.forward(l);
        turtle.turn(360-alpha);
    };
}

function delete_() {
    turtle.ctx.clearRect(0, 0, c.width, c.height);
}