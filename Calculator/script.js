let display = document.getElementById('display');

// Append value to the display
function appendValue(value) {
    display.value += value;
}

// Clear the display
function clearDisplay() {
    display.value = '';
}

// Delete the last character in the display
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Toggle the sign (+/-)
function toggleSign() {
    if (display.value) {
        if (display.value.charAt(0) === '-') {
            display.value = display.value.slice(1);
        } else {
            display.value = '-' + display.value;
        }
    }
}

// Calculate the result
function calculateResult() {
    try {
        // Handle square root
        let result = display.value.replace(/sqrt\((.*?)\)/g, (match, p1) => {
            return Math.sqrt(parseFloat(p1)).toString();
        });

        // Evaluate the expression
        display.value = eval(result);
    } catch (e) {
        display.value = 'Error';
    }
}
