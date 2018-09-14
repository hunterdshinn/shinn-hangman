class Hangman {
    constructor(word, remainingGuesses) {
        this.word = word.toLowerCase().split('')
        this.remainingGuesses = remainingGuesses
        this.guessedLetters = []
        this.status = 'playing'
    }
    calculateStatus() {
        // use .every() array method to return true when finished, otherwise false
        const finished = this.word.every((letter) => this.guessedLetters.includes(letter) || letter === ' ')

        if (this.remainingGuesses === 0) {
            this.status = 'failed'
        } else if (finished) {
            this.status = 'finished'
        } else {
            this.status = 'playing'
        }
    }
    get statusMessage() {
        if (this.status === 'playing') {
            return `Guesses Left: ${this.remainingGuesses}`
        } else if (this.status === 'failed') {
            return `Nice try! The word was "${this.word.join('')}"`
        } else {
            return `Great work! You guessed the word.`
        }
    }
    get puzzle() {
        let puzzle = ''

        this.word.forEach((letter) => {
            if (this.guessedLetters.includes(letter) || letter === ' ') {
                puzzle += letter
            } else {
                puzzle += '*'
            }
        })
    
        return puzzle
    }
    makeGuess(guess) {
        guess = guess.toLowerCase()
        const isUnique = !this.guessedLetters.includes(guess)
        const isBadGuess = !this.word.includes(guess)
        
        // Setting it to only process the guesses if the status is 'Playing'
        if (this.status !== 'playing') {
            return 
        }
        // Adding unique guesses only to the array of guessedLetters
        if (isUnique) {
            this.guessedLetters = [...this.guessedLetters, guess]
        }
    
        // Decrement guesses left if the guess isn't a match
        if (isUnique && isBadGuess) {
            this.remainingGuesses--
        }
    
        this.calculateStatus()
    }
}

export { Hangman as default } 