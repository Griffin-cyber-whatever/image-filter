import {drawOnCanvas} from "./ui.js";
export let loadedData = {};

export async function image_loader() {
  const fileInput = document.getElementById("file-input");
  const urlInput  = document.getElementById("url-input");
  const canvasId = "original-canvas";

  if (document.getElementById("switch-file").checked) {
    if (!fileInput.files.length) {
      console.warn("No file selected");
      return;
    }
    const dataUrl = await loadFile(fileInput.files[0]);
    loadedData = { type: "file", content: dataUrl };
  } else {
    const url = urlInput.value.trim();
    if (!url) {
      console.warn("No URL entered");
      return;
    }
    const blobUrl = await loadFromUrl(url);
    loadedData = { type: "url", content: blobUrl };
  }
  drawOnCanvas(canvasId, loadedData)
}

function loadFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => resolve(reader.result);            // dataURL
    reader.onerror = () => reject(reader.error);
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
