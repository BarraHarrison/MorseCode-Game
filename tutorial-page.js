// Tutorial Page

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

// Function that takes the input text and translates it to Morse code
async function translateToMorse(text) {
    const morseCodeMap = await fetchMorseCodeMap();
    return text.split('').map(character => morseCodeMap[character] || '').join(' ');
}

// Listening for event inputs
document.querySelector('.letters').addEventListener('input', async function() {
    const inputText = this.value.toUpperCase();
    const morseCode = await translateToMorse(inputText);
    document.querySelector('.morse-code').value = morseCode;
});
