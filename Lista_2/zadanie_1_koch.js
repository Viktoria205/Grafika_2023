const c = document.getElementById("Koch");
const ctx = c.getContext("2d");
const pi = Math.PI;

const rules = {
  "F": "F+F-F-F+F"
};

function apply_rules(axiom) {
  let result = "";
  for (let char of axiom) {
      const rule = rules[char];
      result += rule != null ? rule : char;
  }
  return result;
}

function generate(axiom, iterations) {
  for (let i = 0; i < iterations; i++) {
      axiom = apply_rules(axiom);
  }
  return axiom;
}

function draw(turtle, axiom, length) {
    for (let char of axiom) {
        if (char == "F") {
            turtle.forward(length);
        } else if (char == "+") {
            turtle.turn(60);
        } else if (char == "-") {
            turtle.turn(-60);
        }
    }
}

var turtle = {
  x: 100,
  y: 300,
  alpha: 0,
  pencolor: "#000000",
  pen: true,
  lineWidth: 1,
  ctx: ctx
}

turtle.penDown = function () {
  this.pen = true
}

turtle.penUp = function () {
  this.pen = false
}

turtle.forward = function (d) {
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
  } else {
      this.ctx.moveTo(this.x, this.y);
  }
  return this;
}

turtle.backward = function (d) {
  this.forward(-d);
  return this;
}

turtle.turn = function (num) {
  this.alpha -= num;
  return this;
}

const kochCurve = generate("F", 4);

draw(turtle, kochCurve, 1);