var c = document.getElementById("myCanvas");
const pi = Math.PI;
var turtle = {
    x: c.width/2,
    y: c.height,
    z: 0,
    alpha: 0,
    beta: 0,
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
    var z = this.z;
    this.perspective = 20; 

    this.x = a + d * Math.cos(this.alpha * 2 * pi / 360) * Math.cos(this.beta * 2 * pi / 360);
    this.y = b + d * Math.cos(this.alpha * 2 * pi / 360) * Math.sin(this.beta * 2 * pi / 360);
    this.z = z + d * Math.sin(this.alpha * 2 * pi / 360);

    if (this.pen) {
        this.ctx.beginPath();
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.pencolor;
        this.ctx.moveTo(a, b);
        this.ctx.lineTo(this.x, this.y);

        var perspectiveFactor = this.perspective / (this.perspective + this.z);
        var projectedX = this.x * perspectiveFactor;
        var projectedY = this.y * perspectiveFactor;

        this.ctx.lineTo(projectedX, projectedY);
        this.ctx.stroke();
    } else {
        this.ctx.moveTo(this.x, this.y);
    }
    return this;
}
turtle.backward = function(d) {
    this.forward(-d);
    return this;
}

turtle.turn = function(num_1, num_2){
    this.alpha += num_1;
    this.beta +=num_2;    
}
function multiplyMatrix(matrixA, matrixB) {
    let result = [];
    for (let i = 0; i < matrixA.length; i++) {
        result[i] = [];
        for (let j = 0; j < matrixB[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < matrixA[0].length; k++) {
                sum += matrixA[i][k] * matrixB[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}

function RotationOX(beta) {
    return [
        [1, 0, 0],
        [0, Math.cos(beta), -Math.sin(beta)],
        [0, Math.sin(beta), Math.cos(beta)]
    ];
}

function RotationOY(beta) {
    return [
        [Math.cos(beta), 0, Math.sin(beta)],
        [0, 1, 0],
        [-Math.sin(beta), 0, Math.cos(beta)]
    ];
}

function RotationOZ(beta) {
    return [
        [Math.cos(beta), -Math.sin(beta), 0],
        [Math.sin(beta), Math.cos(beta), 0],
        [0, 0, 1]
    ];
}

turtle.turnX = function(P, beta) {
    let rotationMatrix = RotationOX(beta);
    return multiplyMatrix(rotationMatrix, P);
}

turtle.turnY = function(P, beta) {
    let rotationMatrix = RotationOY(beta);
    return multiplyMatrix(rotationMatrix, P);
}

turtle.turnZ = function(P, beta) {
    let rotationMatrix = RotationOZ(beta);
    return multiplyMatrix(rotationMatrix, P);
}

turtle.penWidth = function(num) {
    this.lineWidth = num;
    return this;
}

turtle.ctx = c.getContext("2d");

turtle.penDown();
turtle.forward(100);
