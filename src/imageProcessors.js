export function filter_processor (loadedData){
    const grayscale = document.getElementById("grayscale");
    const invert_colors = document.getElementById("invertColors");
    if (grayscale.checked){

    }
    if (invert_colors.checked){

    }
    display
}

function display(file){
    const canvas = document.getElementById("processed-canvas");
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.onload = function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);
    }
    image.src = file; 
}