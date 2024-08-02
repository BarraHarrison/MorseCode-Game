// morsecodeMap is an object in a separate JS file
const letters = Object.keys(morseCodeMap);

let currentMorseCodeWord = '';
let score = 0;
let timer;
let timeLeft = 60;

// Retrieve the best score from localStorage
let bestScore = localStorage.getItem('bestScore') ? parseInt(localStorage.getItem('bestScore')) : 0;
document.getElementById('best-score').textContent = bestScore;

document.getElementById('startButton').addEventListener('click', startPractice);
document.getElementById('user-translate').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        checkAnswer();
    }
});

// adds click event listener to the submit button
document.getElementById('submitButton').addEventListener('click', function(event) {
    event.preventDefault();
    checkAnswer();
});

// starts the practice game
function startPractice() {
    score = 0;
    timeLeft = 60;
    document.querySelector('.current-score span').textContent = score;
    document.querySelector('.timer-div span').textContent = timeLeft;
    generateMorseCodeWord();
    timer = setInterval(updateTimer, 1000);
}

// random morseCode generated
function generateMorseCodeWord() {
    currentMorseCodeWord = '';
    for (let i = 0; i < 4; i++) { // up to 4 characters of morse code
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        currentMorseCodeWord += morseCodeMap[randomLetter] + ' ';
    }
    document.getElementById('morse-code-practice').value = currentMorseCodeWord.trim();
}


function checkAnswer() {
    const userAnswer = document.getElementById('user-translate').value.toUpperCase();
    const morseToEnglish = currentMorseCodeWord.split(' ').map(code => {
        return Object.keys(morseCodeMap).find(key => morseCodeMap[key] === code);
    }).join('');

    if (userAnswer === morseToEnglish) {
        score++; // increases score if user-translate input was correct
        document.querySelector('.current-score span').textContent = score;
    }
    // another morse code is generated and user-translate is blank once again
    document.getElementById('user-translate').value = '';
    generateMorseCodeWord();
}


function updateTimer() {
    timeLeft--; // decrements the time
    document.getElementById('timer').textContent = timeLeft;
    
    if (timeLeft <= 0) {
        clearInterval(timer);
        alert('Time is up! Your score is ' + score);
        
        // Check if the current score is greater than the best score
        if (score > bestScore) {
            bestScore = score;
            document.getElementById('best-score').textContent = bestScore;
            localStorage.setItem('bestScore', bestScore);
        }
    }
}
