let selectedColors = [];
let timerValue = 10;
let gamePhase = 'betting'; // 'betting', 'calculation', 'result'

const timerElement = document.getElementById('timer-value');
const confirmButton = document.getElementById('confirm-button');
const resultPhase = document.getElementById('result-phase');
const bettingPhase = document.getElementById('betting-phase');
const resultColorElement = document.getElementById('result-color');

function selectColor(element) {
    const color = element.getAttribute('data-color');
    if (selectedColors.includes(color)) {
        selectedColors = selectedColors.filter(c => c !== color);
        element.classList.remove('selected');
    } else if (selectedColors.length < 2) {
        selectedColors.push(color);
        element.classList.add('selected');
    }
    confirmButton.disabled = selectedColors.length !== 2;
}

function confirmBets() {
    gamePhase = 'calculation';
    updateGamePhase();
}

function updateGamePhase() {
    switch (gamePhase) {
        case 'betting':
            bettingPhase.style.display = 'block';
            resultPhase.style.display = 'none';
            confirmButton.disabled = true;
            selectedColors = [];
            document.querySelectorAll('.color-option').forEach(el => el.classList.remove('selected'));
            timerValue = 10;
            startTimer();
            break;
        case 'calculation':
            setTimeout(() => {
                gamePhase = 'result';
                updateGamePhase();
            }, 5000);
            break;
        case 'result':
            bettingPhase.style.display = 'none';
            resultPhase.style.display = 'block';
            const resultColor = getResultColor();
            resultColorElement.style.backgroundColor = resultColor;
            setTimeout(() => {
                gamePhase = 'betting';
                updateGamePhase();
            }, 5000);
            break;
    }
}

function startTimer() {
    const timerInterval = setInterval(() => {
        if (timerValue > 0) {
            timerValue--;
            timerElement.textContent = timerValue;
        } else {
            clearInterval(timerInterval);
            if (gamePhase === 'betting') {
                confirmBets();
            }
        }
    }, 1000);
}

function getResultColor() {
    // Mock result calculation for demo purposes.
    // In real implementation, this would involve server-side logic to determine the color with the least bets.
    const colors = ['red', 'yellow', 'green'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Start the game initially
updateGamePhase();