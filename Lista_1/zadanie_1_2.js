const c = document.getElementById("canvas");
const pi = Math.PI;
var turtle = {
    x: c.width/2,
    y: c.height/2,
    alpha: 0,
    pen: true
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

function clearCanvas() {
    turtle.ctx.clearRect(0, 0, c.width, c.height);
}

function executeCommand() {
    const command = document.getElementById("command").value;
    const parts = command.split(" ");
    const action = parts[0];
    const value = parseInt(parts[1]);

    switch (action) {
        case "fw":
            turtle.forward(value);
            break;
        case "bw":
            turtle.backward(value);
            break;
        case "tr":
            turtle.turn(value);
            break;
        case "pu":
            turtle.penUp();
            break;
        case "pd":
            turtle.penDown();
            break;
        default:
            var messageElement = document.getElementById("message");
            messageElement.style.color = "red";
            messageElement.innerHTML = `Nieznane polecenie: ${action}`;
            break;
    }
}
