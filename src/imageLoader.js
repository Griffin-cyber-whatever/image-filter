export let loadedData = {};

export async function image_loader() {
  const canvas = document.getElementById("original-canvas");
  const ctx    = canvas.getContext("2d");
  
  const fileInput = document.getElementById("file-input");
  const urlInput  = document.getElementById("url-input");
  const useFile   = document.getElementById("switch-file").checked;

  if (useFile) {
    if (!fileInput.files.length) {
      alert("Choose a file first");
      return;
    }
    loadedData = { type: "file", content: await readFileAsDataURL(fileInput.files[0]) };
  } else {
    const url = urlInput.value.trim();
    if (!url) {
      console.warn("No URL entered");
      return;
    }
    loadedData = { type: "url", content: await loadFromUrl(url) };
  }
  await drawToCanvas(loadedData.content, ctx);
}

function readFileAsDataURL(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload  = () => res(reader.result);
    reader.onerror = () => rej(reader.error);
    reader.readAsDataURL(file);
  });
}

async function loadFromUrl(url) {
  // We draw the image in main.js or UI module; here just return a blob URL
  const res  = await fetch(url);
  if (!res.ok) throw new Error(res.statusText);
  const blob = await res.blob();
  return URL.createObjectURL(blob);
}

export function drawToCanvas(src, ctx) {
  return new Promise(res => {
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
      res();
    };
    img.src = src;
  });
}