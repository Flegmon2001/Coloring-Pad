const leftInput = document.getElementById("leftColor");
const rightInput = document.getElementById("rightColor");
const circle = document.getElementById("circle");

// Automatically add # if missing
function enforceHash(input) {
    let value = input.value;
    if (!value.startsWith("#")) {
        const cursorPos = input.selectionStart;
        value = "#" + value.replace(/^#+/, "");
        input.value = value;
        input.setSelectionRange(cursorPos + 1, cursorPos + 1);
    }
}

// Update the circle background
function updateCircle() {
    enforceHash(leftInput);
    enforceHash(rightInput);

    let left = leftInput.value.trim();
    let right = rightInput.value.trim();

    const hexPattern = /^#([0-9A-F]{3}){1,2}$/i;
    if (!hexPattern.test(left) || !hexPattern.test(right)) return;

    if (left.toLowerCase() === right.toLowerCase()) {
        circle.style.background = left;
    } else {
        circle.style.background = `linear-gradient(90deg, ${left}, ${right})`;
    }
}

// Update on typing
leftInput.addEventListener("input", updateCircle);
rightInput.addEventListener("input", updateCircle);

// Save circle as PNG (accurate gradient)
function saveCircleAsImage() {
    const width = circle.offsetWidth;
    const height = circle.offsetHeight;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    const left = leftInput.value.startsWith("#") ? leftInput.value : "#" + leftInput.value;
    const right = rightInput.value.startsWith("#") ? rightInput.value : "#" + rightInput.value;

    const hexPattern = /^#([0-9A-F]{3}){1,2}$/i;
    if (!hexPattern.test(left) || !hexPattern.test(right)) return;

    let gradient;
    if (left.toLowerCase() === right.toLowerCase()) {
        gradient = left;
        ctx.fillStyle = gradient;
    } else {
        gradient = ctx.createLinearGradient(0, 0, width, 0); // horizontal
        gradient.addColorStop(0, left);
        gradient.addColorStop(1, right);
        ctx.fillStyle = gradient;
    }

    // Draw the circle
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, width / 2, 0, Math.PI * 2);
    ctx.fill();

    // Trigger download
    const link = document.createElement("a");
    link.download = "circle.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}

// Hold-to-save logic (desktop + mobile)
let holdTimeout;

// Desktop
circle.addEventListener("mousedown", () => {
    holdTimeout = setTimeout(saveCircleAsImage, 1000);
});
circle.addEventListener("mouseup", () => clearTimeout(holdTimeout));
circle.addEventListener("mouseleave", () => clearTimeout(holdTimeout));

// Mobile / touch
circle.addEventListener("touchstart", (e) => {
    e.preventDefault(); // prevent scrolling
    holdTimeout = setTimeout(saveCircleAsImage, 1000);
});
circle.addEventListener("touchend", () => clearTimeout(holdTimeout));
circle.addEventListener("touchcancel", () => clearTimeout(holdTimeout));
