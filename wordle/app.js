'use strict'

document.addEventListener('DOMContentLoaded', () => {
    
    let grid = document.getElementById('grid')

    function buildGrid() {
        for (let i = 0; i < 6; i++) {
            let row = document.createElement('div')
            row.className = 'row'
            for (let j = 0; j < 5; j++) {
                let cell = document.createElement('div')
                cell.className = 'cell'
                row.appendChild(cell)
            }
            grid.appendChild(row)
        }
    }
    buildGrid()
    
    let wordList = [
        'white',
        'space',
        'house',
        'piano',
    ]
    let randomIndex = Math.floor(Math.random() * wordList.length)
    let secretWord = 'house'
    
    let attempts = []
    let currentAttempt = 'ohude'
    updateGrid()

    function updateGrid() {
        let row = grid.firstChild
        for(let attempt of attempts) {
            darawPassAttempt(row,attempt)
            row = row.nextSibling
        }
        darawCurrentAttempt(row,currentAttempt)
    }
    function darawPassAttempt(row,attempt) {
        for (let i = 0; i < attempt.length; i++) {
            let cell = row.children[i]
            cell.textContent = attempt[i]
            cell.style.backgroundColor = getBgColor(attempt,i)
        }        
    }
    function darawCurrentAttempt(row,attempt) {
        for (let i = 0; i < attempt.length; i++) {
            let cell = row.children[i]
            cell.textContent = attempt[i]
            cell.style.backgroundColor = getBgColor(attempt,i)
        }       
    }
    function getBgColor(attempt,i) {
        let correctLetter = secretWord[i]
        let attemptLetter = attempt[i]
        if(secretWord.indexOf(attemptLetter) === -1) {
            return '#3a3a3c'
        }
        if(correctLetter === attemptLetter) {
            return '#538d4e'
        }
        return '#b59f3b'
    }

})