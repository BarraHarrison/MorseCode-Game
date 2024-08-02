// Tutorial Page

// listening for event inputs
document.querySelector('.letters').addEventListener('input', function() {
    const inputText = this.value.toUpperCase();
    document.querySelector('.morse-code').value = translateToMorse(inputText);
});

// function that takes the input text and translates it to morse code
function translateToMorse(text) {
    return text.split('').map(character => morseCodeMap[character] || '').join(' ');
}
