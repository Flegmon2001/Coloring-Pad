const leftInput = document.getElementById("leftColor");
const rightInput = document.getElementById("rightColor");
const circle = document.getElementById("circle");

function enforceHash(input) {
    if (!input.value.startsWith("#")) {
        input.value = "#" + input.value.replace(/^#+/, "");
    }
}

function updateCircle() {
    enforceHash(leftInput);
    enforceHash(rightInput);

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

// Update on typing
leftInput.addEventListener("input", () => {
    enforceHash(leftInput);
    updateCircle();
});

rightInput.addEventListener("input", () => {
    enforceHash(rightInput);
    updateCircle();
});
