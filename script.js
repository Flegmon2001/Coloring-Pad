const leftInput = document.getElementById("leftColor");
const rightInput = document.getElementById("rightColor");
const circle = document.getElementById("circle");
const downloadBtn = document.getElementById("downloadBtn");

function updateCircle() {
    let left = leftInput.value.trim();
    let right = rightInput.value.trim();

    const hexPattern = /^#([0-9A-F]{3}){1,2}$/i;

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

// DOWNLOAD FUNCTION
downloadBtn.addEventListener("click", () => {
    const canvas = document.createElement("canvas");
    const size = 500;

    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");

    // Draw circle
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    let left = leftInput.value.trim();
    let right = rightInput.value.trim();

    if (left.toLowerCase() === right.toLowerCase()) {
        ctx.fillStyle = left;
    } else {
        const gradient = ctx.createLinearGradient(0, 0, size, 0);
        gradient.addColorStop(0, left);
        gradient.addColorStop(1, right);
        ctx.fillStyle = gradient;
    }

    ctx.fillRect(0, 0, size, size);

    // Download image
    const link = document.createElement("a");
    link.download = "circle.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});
