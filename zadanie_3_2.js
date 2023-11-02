var c = document.getElementById("myGraf");

const pi = Math.PI;
var turtle = {
    x: c.width / 2,
    y: c.height / 2,
    alpha: 0,
    pencolor: "#006400",
    pen: false,
    lineWidth: 1,
}

turtle.penDown = function() {
    this.pen = true;
}

turtle.penUp = function() {
    this.pen = false;
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

turtle.drawEdge = function(x1, y1, x2, y2) {
    this.ctx.strokeStyle = '#000';
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y2);
    this.ctx.lineTo(x2, y1);
    this.ctx.stroke();
    return this;
}

turtle.ctx = c.getContext("2d");

function drawVertex(x, y, color) {
    turtle.pencolor = color;
    turtle.position(x, y);
    turtle.dot(10); 
}

function drawBipartiteGraph(m, n) {
    const spacing = 100;
    const xO = 15;

    for (let i = 0; i < m; i++) {
        const x = i * spacing + xO;
        const y = c.height / 3;
        drawVertex(x, y, '#FF5733');
    }

    for (let i = 0; i < n; i++) {
        const x = i * spacing + xO;
        const y = (2 * c.height) / 3;
        drawVertex(x, y, '#33FF57');
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const x1 = i * spacing + xO;
            const y1 = c.height / 3;
            const x2 = j * spacing + xO;
            const y2 = (2 * c.height) / 3;
            turtle.drawEdge(x1, y1, x2, y2);
        }
    }
}

function click_() {
    var n_1 = document.getElementById('n_1').value;
    var n_2 = document.getElementById('n_2').value;
    drawBipartiteGraph(n_1, n_2);
};