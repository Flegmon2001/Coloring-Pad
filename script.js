const leftInput = document.getElementById("leftColor");
const rightInput = document.getElementById("rightColor");
const circle = document.getElementById("circle");
const downloadBtn = document.getElementById("downloadBtn");

const hexPattern = /^#([0-9A-F]{3}){1,2}$/i;

function updateCircle() {
    let left = leftInput.value.trim();
    let right = rightInput.value.trim();

    if (!hexPattern.test(left) || !hexPattern.test(right)) {
        return;
    }

    if (left.toLowerCase() === right.toLowerCase()) {
        circle.style.background = left;
    } else {
        circle.style.background = `linear-gradient(90deg, ${left}, ${right})`;
    }
}

leftInput.addEventListener("input", updateCircle);
rightInput.addEventListener("input", updateCircle);

downloadBtn.addEventListener("click", () => {
    let left = leftInput.value.trim();
    let right = rightInput.value.trim();

    // ✅ Prevent download if invalid
    if (!hexPattern.test(left) || !hexPattern.test(right)) {
        alert("Please enter valid HEX colors like #ff0000");
        return;
    }

    const canvas = document.createElement("canvas");
    const size = 500;

    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");

    // Draw circular clip
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    if (left.toLowerCase() === right.toLowerCase()) {
        ctx.fillStyle = left;
    } else {
        const gradient = ctx.createLinearGradient(0, 0, size, 0);
        gradient.addColorStop(0, left);
        gradient.addColorStop(1, right);
        ctx.fillStyle = gradient;
    }

    ctx.fillRect(0, 0, size, size);

    // ✅ More reliable download method
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "circle.png";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
