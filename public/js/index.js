var bouncing = false;
let timerId = null;
var dy = 0;
const dango = document.getElementById("dango");
console.log(parseInt(dango.style.top));

window.addEventListener("DOMContentLoaded", function () {
    dango.addEventListener("click", animate);
});

function animate(e) {
    if (bouncing) {
        bouncing = false;
        clearInterval(timerId);
    } else {
        timerId = setInterval(moveImage, 6);
        bouncing = true;
    }
}

function moveImage() {
    let imgY = parseInt(dango.style.top);

    if (dy < 3) {
        dy++;
    } else if (dy > 3) {
        dy--;
    }

    dango.style.top = imgY + dy + "px";
}
