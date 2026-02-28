/* ============================================
   V-CALCULATOR - Calculator Logic
   Developer: Md. Mainul Islam
   Owner: MAINUL - X
   GitHub: M41NUL
   Contact: +8801308850528
   ============================================ */

let display = document.getElementById('display');
let isDegree = true;
let degBtn = document.getElementById('degBtn');

// Append number/operator to display
function append(value) {
    if (display.value === '0' && value !== '.') {
        display.value = value;
    } else {
        display.value += value;
    }
}

// Clear all
function clearAll() {
    display.value = '0';
}

// Calculate result
function calculate() {
    try {
        let expression = display.value;
        
        // Handle factorial
        expression = expression.replace(/(\d+)!/g, (match, num) => {
            return factorial(parseInt(num));
        });
        
        // Handle 1/x
        expression = expression.replace(/1\/(\d+)/g, (match, num) => {
            return 1 / parseFloat(num);
        });
        
        // Handle scientific functions
        expression = expression.replace(/sin\(([^)]+)\)/g, (match, angle) => {
            return Math.sin(isDegree ? toRadians(eval(angle)) : eval(angle));
        });
        
        expression = expression.replace(/cos\(([^)]+)\)/g, (match, angle) => {
            return Math.cos(isDegree ? toRadians(eval(angle)) : eval(angle));
        });
        
        expression = expression.replace(/tan\(([^)]+)\)/g, (match, angle) => {
            return Math.tan(isDegree ? toRadians(eval(angle)) : eval(angle));
        });
        
        expression = expression.replace(/log\(([^)]+)\)/g, (match, num) => {
            return Math.log10(eval(num));
        });
        
        expression = expression.replace(/ln\(([^)]+)\)/g, (match, num) => {
            return Math.log(eval(num));
        });
        
        expression = expression.replace(/sqrt\(([^)]+)\)/g, (match, num) => {
            return Math.sqrt(eval(num));
        });
        
        // Handle power
        expression = expression.replace(/(\d+)\*\*(\d+)/g, (match, base, exp) => {
            return Math.pow(eval(base), eval(exp));
        });
        
        // Handle percentage
        expression = expression.replace(/(\d+)%/g, (match, num) => {
            return parseFloat(num) / 100;
        });
        
        // Evaluate the expression
        let result = eval(expression);
        
        if (isNaN(result) || !isFinite(result)) {
            display.value = 'Error';
        } else {
            display.value = result;
        }
    } catch (error) {
        display.value = 'Error';
    }
}

// Factorial function
function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Convert degrees to radians
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Toggle Degree/Radian
function toggleDeg() {
    isDegree = !isDegree;
    updateStatusBar();
}

// Update status bar
function updateStatusBar() {
    let statusBar = document.getElementById('statusBar');
    statusBar.innerHTML = `${isDegree ? 'DEG' : 'RAD'} | © 2026 MAINUL - X`;
    degBtn.textContent = isDegree ? 'DEG' : 'RAD';
    degBtn.className = `btn function ${isDegree ? 'deg-active' : 'rad-active'}`;
}

// Append operator
function appendOperator(op) {
    display.value += op;
}

// Append function
function appendFunction(func) {
    display.value += func;
}

// Append constant
function appendConstant(constant) {
    if (constant === 'pi') {
        display.value += Math.PI;
    } else if (constant === 'e') {
        display.value += Math.E;
    }
}

// Initialize
updateStatusBar();

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') append(e.key);
    if (e.key === '.') append('.');
    if (e.key === '+') append('+');
    if (e.key === '-') append('-');
    if (e.key === '*') append('*');
    if (e.key === '/') append('/');
    if (e.key === 'Enter' || e.key === '=') calculate();
    if (e.key === 'Escape') clearAll();
    if (e.key === '%') append('%');
});
