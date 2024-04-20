document.addEventListener('DOMContentLoaded', function () {
    const words = ["desarrollo","programar","trasforar","riwi","coders"];
    let selectedWord = '';
    let guessedWord = [];
    let incorrectGuesses = 0;
    const maxIncorrectGuesses = 6;

    function initializeGame() {
        selectedWord = words[Math.floor(Math.random() * words.length)];
        guessedWord = new Array(selectedWord.length).fill('_');
        incorrectGuesses = 0;

        renderWord();
        renderAlphabet();
        renderHangman();
    }

    function renderWord() {
        const wordContainer = document.getElementById('word-container');
        wordContainer.innerHTML = guessedWord.join(' ');
    }

    function renderAlphabet() {
        const alphabetContainer = document.getElementById('alphabet-container');
        alphabetContainer.innerHTML = '';

        for (let i = 65; i <= 90; i++) {
            const letter = String.fromCharCode(i);
            const button = document.createElement('button');
            button.innerText = letter;
            button.addEventListener('click', function () {
                handleGuess(letter);
            });
            alphabetContainer.appendChild(button);
        }
    }

    function handleGuess(letter) {
        if (selectedWord.includes(letter.toLowerCase())) {
            for (let i = 0; i < selectedWord.length; i++) {
                if (selectedWord[i] === letter.toLowerCase()) {
                    guessedWord[i] = letter.toLowerCase();
                }
            }
            renderWord();
            checkGameResult();
        } else {
            incorrectGuesses++;
            renderHangman();
            checkGameResult();
        }
    }

    function renderHangman() {
        const hangmanContainer = document.getElementById('hangman-container');
        hangmanContainer.innerHTML = 'Incorrect Guesses: ' + incorrectGuesses + ' / ' + maxIncorrectGuesses;

        if (incorrectGuesses === maxIncorrectGuesses) {
            endGame(false);
        }
    }

    function checkGameResult() {
        if (guessedWord.join('') === selectedWord) {
            endGame(true);
        }
    }

    function endGame(isWinner) {
        const resultContainer = document.getElementById('result');
        resultContainer.innerText = isWinner ? '¡Ganaste!' : 'Perdiste. La palabra era: ' + selectedWord;

        // Deshabilitar botones de letras
        const alphabetButtons = document.querySelectorAll('#alphabet-container button');
        alphabetButtons.forEach(button => button.disabled = true);
    }

    initializeGame();
});

