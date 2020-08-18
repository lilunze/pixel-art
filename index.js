var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var geomData = [];
// grid width
const gridWidth = 1;

new Promise(resolve => {
    let img = new Image();
    img.src = './landscape.jpg';
    img.onload = () => {
        resolve(img);
    }
}).then(img => new Promise(resolve => {
    // draw img
    canvas.height = img.height;
    canvas.width = img.width;
    canvas.style.width = `${img.width}px`;
    canvas.style.height = `${img.height}px`;
    ctx.drawImage(img, 0, 0);
    resolve(img);
}))
.then(img => {
    // draw grid
    for(let x = 0; x * gridWidth < img.width; x++){
        for(let y = 0; y * gridWidth < img.height; y++){
            const imgData = ctx.getImageData(x * gridWidth, y * gridWidth, 1, 1).data;
            // const color = `rgb(${imgData[0]}, ${imgData[1]}, ${imgData[2]})`;
            let m = parseInt((imgData[0] + imgData[1] + imgData[2]) / 3) > 100 ? 255 : 0
            const color = `rgba(${m},${m},${m})`
            ctx.fillStyle = color;
            ctx.fillRect(x * gridWidth - gridWidth / 2, y * gridWidth - gridWidth / 2, gridWidth, gridWidth);
        }
    }
})