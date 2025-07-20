export function drawOnCanvas(canvasId, {content}){
    const canvas = document.getElementById("original-canvas");
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.onload = function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);
    }
    image.src = content; 
}