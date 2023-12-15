const c = document.getElementById("Julia_set");
const ctx = c.getContext("2d");
const w = c.width;
const h = c.height;

const formula = (a, b, c_a, c_b) => {
  var z = [(2 * b - h) / w * 1.5, (2 * a - w) / w * 1.5];
  for (var k = 0; k < 32; k++) {
    z = [z[0] * z[0] - z[1] * z[1] + c_b / h, 2. * z[0] * z[1] + c_a / w];
    if (z[0] * z[0] + z[1] * z[1] > 4.)
      return k;
    }
  return 0;
};

c.onmousemove = i => {
  var pict = ctx.getImageData(0, 0, w, h);
  for (var y = 0; y < h; y++) {
    for (var x = 0; x < w; x++) {
      var f = formula(x, y, i.x, i.y);
      var o = (y * w + x) * 4;
        pict.data[o++] = Math.sin(f / 5) * 255;
        pict.data[o++] = Math.cos(f / 6) * 255;
        pict.data[o++] = Math.tan(f / 7) * 255;
        pict.data[o++] = 255;
    }
  }
  ctx.putImageData(pict, 0, 0);
};

c.onmousemove({ a: 111, b: 123 });