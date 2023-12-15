const c = document.getElementById("fern");
c.width = window.innerWidth;
c.height = window.innerHeight;

const g = c.getContext("2d");
var fern_color = "#5AA84F";

const fern = [];
const limit = 250000;
var pixel_count = 0;

function create_point(left_m, top_m, w, h) {
    var a = 0, b = 0;

    for (let l = 0; l < limit; l++) {
        var x, y;
        var k = Math.random();

        if (k <= 0.01) {
            x = 0;
            y = 0.15 * b;
        } else if (k <= 0.08) {
            x = 0.2 * a - 0.26 * b;
            y = 0.23 * a + 0.22 * b + 1.6;
        } else if (k <= 0.15) {
            x = -0.15 * a + 0.28 * b;
            y = 0.25 * a + 0.24 * b + 0.42;
        } else {
            x = 0.85 * a + 0.04 * b;
            y = -0.04 * a + 0.85 * b + 1.6;
        }
        a = x;
        b = y;

        fern[l] = [
            Math.round(left_m + w / 2 + x * w / 11),
            Math.round(top_m + h - y * h / 11)
        ];
    }
}

function draw() {
    let requestID = requestAnimationFrame(draw);
    if (pixel_count < limit) {
        g.fillStyle = fern_color;
        for (let l = pixel_count; l < 400 + pixel_count; l++) {
            g.fillRect(fern[l][0], fern[l][1], 1, 1);
        }
        pixel_count += 400;
    } else {
        cancelAnimationFrame(requestID);
    }
}

function changeColor() {
    fern_color = document.getElementById("color_picker").value;
    resetCanvas();
}

function resetCanvas() {
    pixel_count = 0;
    g.clearRect(0, 0, c.width, c.height);
    create_point((c.width - 600) / 2, (c.height - 600) / 2, 600, 600);
    draw();
}

document.getElementById("color_picker").addEventListener("input", changeColor);
create_point((c.width - 600) / 2, (c.height - 600) / 2, 600, 600);
draw();