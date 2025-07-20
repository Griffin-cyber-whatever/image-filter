export function filter_processor({ content }) {
  const canvas = document.getElementById("processed-canvas");
  const ctx    = canvas.getContext("2d");
  const img    = new Image();
  img.src      = content;
  img.onload   = () => {
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data      = imageData.data;
    if (document.getElementById("grayscale").checked) {
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i+1] + data[i+2]) / 3;
        data[i] = data[i+1] = data[i+2] = avg;
      }
    }
    if (document.getElementById("invertColors").checked) {
      for (let i = 0; i < data.length; i += 4) {
        data[i]   = 255 - data[i];
        data[i+1] = 255 - data[i+1];
        data[i+2] = 255 - data[i+2];
      }
    }
    ctx.putImageData(imageData, 0, 0);
  };
}
