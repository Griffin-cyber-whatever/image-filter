export let loadedData = {};
export function image_loader() {
  const fileRadio = document.getElementById("switch-file");

  if (fileRadio.checked) {
    const fileInput = document.getElementById("file-input");
    const files = fileInput.files; // Get files from input element

    if (!files || files.length === 0) {
      // Check if files exist and array not empty
      console.log("⚠️ invalid data: no file selected");
      return;
    }
    const content = loadFile(files[0]);
    console.log(content);
  } else {
    const urlRow = document.getElementById("url-input");
    const value = urlRow.value;
    if (!value) {
      // display invalid data
      console.log("⚠️ invalid data: no url typed");
      return;
    }
    const content = loadFromUrl(value);
    loadedData = {type:"file", content:content};
  }
}

function loadFile(file) {
    const canvas = document.getElementById("original-canvas");
    const ctx = canvas.getContext('2d');

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        // when reading finishes:
        reader.onload = () => {
            const image = new Image();
            image.onload = function(){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, 0, 0);
            }
            image.src = reader.result;
            resolve(reader.result)
        };
        reader.onerror = () => reject(reader.error);

        const content = reader.readAsDataURL(file);
        loadedData = {type:"url", content:content};
    });
}

async function loadFromUrl(url) {
    const canvas = document.getElementById("original-canvas");
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.onload = function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);
    }
    image.src = url; 

    const res = await fetch(url);
    if (!res.ok) throw new Error(res.statusText);
    const blob = await res.blob();
    return URL.createObjectURL(blob);
}
