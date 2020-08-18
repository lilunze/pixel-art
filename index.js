let canvasN = document.createElement('canvas');
let canvas = document.createElement('canvas')
var ctx = canvas.getContext('2d');
let ctxN = canvasN.getContext('2d');
// grid width
let gridWidth = 1;

new Promise(resolve => {
    let img = new Image();
    img.src = './landscape.jpg';
    img.onload = () => { resolve(img) };
})
.then(img => new Promise(resolve => {
    // draw img
    canvas.height = canvasN.height = img.height;
    canvas.width = canvasN.width = img.width;
    ctx.drawImage(img, 0, 0);
    resolve(img);
}))
.then(img => {
    // draw grid
    for(let x = 0; x * gridWidth < img.width; x++){
        for(let y = 0; y * gridWidth < img.height; y++){
            const preData = ctx.getImageData((x-1) * gridWidth, (y-1) * gridWidth, 1, 1).data;
            const imgData = ctx.getImageData(x * gridWidth, y * gridWidth, 1, 1).data;
            // 执行对应颜色算法
            const color = brownTransfer(imgData[0], imgData[1], imgData[2])
            ctxN.fillStyle = color;
            ctxN.fillRect(x * gridWidth - gridWidth / 2, y * gridWidth - gridWidth / 2, gridWidth, gridWidth);
        }
    }
    document.querySelector('body').appendChild(canvasN)
})

$('#buttons button').click(function(e) {
    console.log($(e.target).data('event'))
})

// 浮雕
function reliefTransfer(R1, G1, B1, R2, G2, B2) {
    const r = (R1 - R2 + 128) * 0.3;
    const g = (G1 - G2 + 128) * 0.59;
    const b = (B1 - B2 + 128) * 0.11;
    return `rgb(${r}, ${g}, ${b})`;
}

// 马赛克
function mosaicTransfer(R, G, B) {
    gridWidth = 6;
    return `rgb(${R}, ${G}, ${B})`;
}

// 怀旧滤镜
function nostalgicTransfer(R, G, B) {
    let r = (0.393 * R + 0.769 * G + 0.189 * B);
    let g = (0.349 * R + 0.686 * G + 0.168 * B);
    var b = (0.272 * R + 0.534 * G + 0.131 * B);
    r = r < 0 ? 0 : r > 255 ? 255 : r;
    g = g < 0 ? 0 : g > 255 ? 255 : g;
    b = b < 0 ? 0 : b > 255 ? 255 : b;
    return `rgb(${r}, ${g}, ${b})`;
} 

// 熔铸滤镜
function castingTransfer(R, G, B) {
    let r = R * 128 / (G + B + 1);
    let g = G * 128 / (R + B + 1);
    let b = B * 128 / (G + R + 1);
    r = r < 0 ? 0 : r > 255 ? 255 : r;
    g = g < 0 ? 0 : g > 255 ? 255 : g;
    b = b < 0 ? 0 : b > 255 ? 255 : b;
    return `rgb(${r}, ${g}, ${b})`
}

// 连环画滤镜
function colorTransfer(R, G, B) {
    const r = Math.abs(G - B + G + R) * R / 256;
    const g = Math.abs(B - G + B + R) * R / 256;
    const b = Math.abs(B - G + B + R) * G / 256;
    return `rgb(${r}, ${g}, ${b})`
}

// 冰冻滤镜
function frozenTransfer(R, G, B) {
    let r = (R - G - B) * 3 / 2;
    let g = (G - R - B) * 3 / 2;
    let b = (B - G - R) * 3 / 2;
    r = r < 0 ? 0 : r > 255 ? 255 : r;
    g = g < 0 ? 0 : g > 255 ? 255 : g;
    b = b < 0 ? 0 : b > 255 ? 255 : b;
    return `rgb(${r}, ${g}, ${b})`
}

// 灰度转换
function grayTransfer(R, G, B) {
    // 加权平均
    const c = 0.3 * R + 0.59 * G + 0.11 * B
    return `rgb(${c}, ${c}, ${c})`
}

// 黑白转换
function bwTransfer(R, G, B) {
    const avg = (R + G + B) / 3;
    const c = avg >= 100 ? 255 : 0;
    return `rgb(${c}, ${c}, ${c})`
}

// 底片
function reverse(R, G, B) {
    const r = 255 - R;
    const g = 255 - G;
    const b = 255 - B
    return `rgb(${r}, ${g}, ${b})`
}

// 去色滤镜
function colorRemove(R, G, B) {
    // 最值平均值
    const avg = Math.floor((Math.min(R, G, B) + Math.max(R, G, B)) / 2 );
    return `rgb(${avg}, ${avg}, ${avg})`
}

// 褐色转换
function brownTransfer(R, G, B) {
    const r = R * 0.393 + G * 0.769 + B * 0.189;
    const g = R * 0.349 + G * 0.686 + B * 0.168;
    const b = R * 0.272 + G * 0.534 + B * 0.131;
    return `rgb(${r}, ${g}, ${b})`
}
