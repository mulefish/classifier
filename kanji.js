let canvas;
let ctx;
let flag = false;
let prevX = 0;
let currX = 0;
let prevY = 0;
let currY = 0;
let dot_flag = false;
let thickness = 512 / 30 ; // line thickness
//console.log("thicknesss is " + thickness )
function init() {
    canvas = document.getElementById('can');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;
    canvas.addEventListener("touchmove", function(e) {
        findxy('touchmove', e)
    }, false);
    canvas.addEventListener("touchstart", function(e) {
        findxy('touchstart', e)
    }, false);
    canvas.addEventListener("touchend", function(e) {
        findxy('touchend', e)
    }, false);
    canvas.addEventListener("mousemove", function(e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function(e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function(e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function(e) {
        findxy('out', e)
    }, false);
}

function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = "black";
    ctx.lineWidth = thickness;
    ctx.stroke();
    ctx.closePath();
}


function erase() {
    ctx.clearRect(0, 0, w, h);
    document.getElementById("canvasimg").style.display = "none";
}

function save() {
    document.getElementById("canvasimg").style.border = "2px solid";
    var dataURL = canvas.toDataURL();
    document.getElementById("canvasimg").src = dataURL;
    document.getElementById("canvasimg").style.display = "inline";
}

function findxy(res, e) {
    if (res == 'down' ) {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;
        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if ( res === "touchstart") {
  
    prevX = currX;
    prevY = currY;
    currX = e.touches[0].clientX - canvas.offsetLeft;
    currY = e.touches[0].clientY - canvas.offsetTop;
    flag = true;
    dot_flag = true;
    if (dot_flag) {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(currX, currY, 2, 2);
        ctx.closePath();
        dot_flag = false;
    }




    }



    if (res == 'up' || res == "out" || res === 'touchend') {
        flag = false;
    }

    if (res == 'touchmove') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.touches[0].clientX - canvas.offsetTop;
            currY = e.touches[0].clientY - canvas.offsetTop;
            draw();
        }
    }

    
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}