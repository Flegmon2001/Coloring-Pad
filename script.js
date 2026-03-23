const leftInput = document.getElementById("leftColor");
const rightInput = document.getElementById("rightColor");
const circle = document.getElementById("circle");

function updateCircle() {
    let left = leftInput.value.trim();
    let right = rightInput.value.trim();

    if (!left.contains("#")) {
        left = "#" + left;
    }

    // Basic hex validation
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

// Update on typing
leftInput.addEventListener("input", updateCircle);
rightInput.addEventListener("input", updateCircle);
