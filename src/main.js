import {image_loader, loadedData} from "./imageLoader.js"
import {applyFilters} from "./imageProcessors.js"

// input part
const fileRadio = document.getElementById("switch-file");
const urlRadio = document.getElementById("switch-url");
const fileRow = document.getElementById("file-row");
const urlRow = document.getElementById("url-row");

function updateSourceInput() {
  if (fileRadio.checked) {
    fileRow.style.display = "";
    urlRow.style.display  = "none";
  } else {
    fileRow.style.display = "none";
    urlRow.style.display  = "";
  }
}

fileRadio.addEventListener("change", updateSourceInput);
urlRadio.addEventListener("change", updateSourceInput);


const apply_image = document.getElementById("apply-image");
apply_image.addEventListener('click', async e => {
  await image_loader();
})

const apply_filters = document.getElementById("apply-filters");
apply_filters.addEventListener('click', () => applyFilters(loadedData.content));
