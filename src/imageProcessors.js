export async function applyFilters(loadedDataURL) {
  if (!loadedDataURL) {
    alert("Load an image first!");
    return;
  }

  const grayOn   = document.getElementById("grayscale").checked;
  const invertOn = document.getElementById("invertColors").checked;
  if (!grayOn && !invertOn) return;   // nothing to do

  /* draw original into an off-screen canvas so we can read pixels */
  const canvas = document.createElement("canvas");
  const ctx    = canvas.getContext("2d");
  const img    = await loadImage(loadedDataURL);
  canvas.width  = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  /* pixel-level manipulation */
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < data.length; i += 4) {
    let [r, g, b] = [data[i], data[i + 1], data[i + 2]];

    if (grayOn) {
      const avg = (r + g + b) / 3;
      r = g = b = avg;
    }
    if (invertOn) {
      r = 255 - r;
      g = 255 - g;
      b = 255 - b;
    }

    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
  }
  ctx.putImageData(new ImageData(data, canvas.width, canvas.height), 0, 0);

  /* show result on the processed canvas */
  const out = document.getElementById("processed-canvas").getContext("2d");
  out.clearRect(0, 0, out.canvas.width, out.canvas.height);
  out.drawImage(canvas, 0, 0, out.canvas.width, out.canvas.height);
}

/* tiny helper */
function loadImage(src) {
  return new Promise(res => {
    const img = new Image();
    img.onload = () => res(img);
    img.src = src;
  });
}
