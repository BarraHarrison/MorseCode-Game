let morseCodeMap = {};

// Fetch the Morse code map and start the application
async function initialize() {
    morseCodeMap = await fetchMorseCodeMap();
    setupEventListeners();
    initializeGame();
}

// Function to fetch JSON data
async function fetchMorseCodeMap() {
    try {
        const response = await fetch('morseCodeMap.json');
        const morseCodeMap = await response.json();
        return morseCodeMap;
    } catch (error) {
        console.error('Error fetching the morse code map:', error);
        return {};
    }
}

let currentMorseCodeWord = '';
let score = 0;
let timer;
let timeLeft = 60;


// Retrieve the best score from localStorage
let bestScore;
if (localStorage.getItem('bestScore')) {
    bestScore = parseInt(localStorage.getItem('bestScore'));
} else {
    bestScore = 0;
}
document.getElementById('best-score').textContent = bestScore;

function setupEventListeners() {
    document.getElementById('startButton').addEventListener('click', startPractice);
    document.getElementById('user-translate').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            checkAnswer();
        }
    });
}


    // Adds click event listener to the submit button
    document.getElementById('submitButton').addEventListener('click', function(event) {
        event.preventDefault();
        checkAnswer();
    });


// Starts the practice game
function startPractice() {
    score = 0;
    timeLeft = 60;
    document.querySelector('.current-score span').textContent = score;
    document.querySelector('.timer-div span').textContent = timeLeft;
    generateMorseCodeWord();
    timer = setInterval(updateTimer, 1000);
}

// Random Morse code generated
function generateMorseCodeWord() {
    const letters = Object.keys(morseCodeMap);
    currentMorseCodeWord = '';
    for (let i = 0; i < 4; i++) { // Up to 4 'symbols' of Morse code
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
        score++; // Increases score if user-translate input was correct
        document.querySelector('.current-score span').textContent = score;
    }
    // Another Morse code is generated and user-translate is blank once again
    document.getElementById('user-translate').value = '';
    generateMorseCodeWord();
}

function updateTimer() {
    timeLeft--; // Decrements the time
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

// Initialize the application
initialize();
