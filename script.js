const leftInput = document.getElementById("leftColor");
const rightInput = document.getElementById("rightColor");
const circle = document.getElementById("circle");

function enforceHash(input) {
    let value = input.value;

    if (!value.startsWith("#")) {
        const cursorPos = input.selectionStart;

        // Remove any existing # and add one at the start
        value = "#" + value.replace(/^#+/, "");
        input.value = value;

        // Fix cursor position so typing feels natural
        input.setSelectionRange(cursorPos + 1, cursorPos + 1);
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
