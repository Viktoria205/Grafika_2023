/*---------------------1----------------*/
const c = document.getElementById("Ellipse");
const ctx = c.getContext("2d");

const canvas_width = c.width;
const canvas_height = c.height;

// Parametry elipsy
const center_X = canvas_width / 2;
const center_Y = canvas_height / 2;
const radius_X = 100;
const radius_Y = 50;

function drawEllipseBresenham(ctx, xc, yc, rx, ry) {
    var dx, dy, d1, d2, x, y;
    x = 0;
    y = ry;

    d1 = (ry * ry) - (rx * rx * ry) + (0.25 * rx * rx);
    dx = 2 * ry * ry * x;
    dy = 2 * rx * rx * y;

    while (dx < dy) {
        ctx.fillRect(x + xc, y + yc, 1, 1);
        ctx.fillRect(-x + xc, y + yc, 1, 1);
        ctx.fillRect(x + xc, -y + yc, 1, 1);
        ctx.fillRect(-x + xc, -y + yc, 1, 1);

        if (d1 < 0) {
            x++;
            dx = dx + (2 * ry * ry);
            d1 = d1 + dx + (ry * ry);
        } else {
            x++;
            y--;
            dx = dx + (2 * ry * ry);
            dy = dy - (2 * rx * rx);
            d1 = d1 + dx - dy + (ry * ry);
        }
    }

    d2 = ((ry * ry) * ((x + 0.5) * (x + 0.5))) + ((rx * rx) * ((y - 1) * (y - 1))) - (rx * rx * ry * ry);

    while (y >= 0) {
        ctx.fillRect(x + xc, y + yc, 1, 1);
        ctx.fillRect(-x + xc, y + yc, 1, 1);
        ctx.fillRect(x + xc, -y + yc, 1, 1);
        ctx.fillRect(-x + xc, -y + yc, 1, 1);

        if (d2 > 0) {
            y--;
            dy = dy - (2 * rx * rx);
            d2 = d2 + (rx * rx) - dy;
        } else {
            y--;
            x++;
            dx = dx + (2 * ry * ry);
            dy = dy - (2 * rx * rx);
            d2 = d2 + dx - dy + (rx * rx);
        }
    }
}

// Pomiar czasu dla algorytmu Bresenhama
var start = new Date().getMilliseconds();
drawEllipseBresenham(ctx, center_X, center_Y, radius_X, radius_Y);
var end = new Date().getMilliseconds();
var time = end - start;
document.getElementById("check").innerHTML = "Execution time of Bresenham algorithm: " + time + " miliseconds";
/*-------------------------2--------------------------*/
const d = document.getElementById("Ellipse_2");
const dtx = d.getContext("2d");

const canvas_Width = d.width;
const canvas_Height = d.height;
const pi = Math.PI;

// Parametry elipsy
const center_x = canvas_width / 2;
const center_y = canvas_height / 2;
const radius_x = 100;
const radius_y = 50;

function drawEllipseNaive(dtx, xc, yc, rx, ry) {
    for (let theta = 0; theta < 2 * pi; theta += 0.01) {
            var x = xc + rx * Math.cos(theta);
            var y = yc + ry * Math.sin(theta);
            dtx.fillRect(x, y, 1, 1);
    }
}

// Pomiar czasu dla algorytmu Bresenhama
var start = new Date().getMilliseconds();
drawEllipseNaive(dtx, center_x, center_y, radius_x, radius_y);
var end = new Date().getMilliseconds();
var time = end - start;
document.getElementById("check_2").innerHTML = "Execution time of naive drawing: " + time + " miliseconds";