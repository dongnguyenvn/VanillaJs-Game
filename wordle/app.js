'use strict'

document.addEventListener('DOMContentLoaded', () => {
    
    let grid = document.getElementById('grid')
    let keyboard = document.getElementById('keyboard')
    let wordList = [
        'white',
        'space',
        'house',
        'piano',
    ]
    let randomIndex = Math.floor(Math.random() * wordList.length)
    let secretWord = 'house'
    
    let attempts = []
    let currentAttempt = ''


    window.addEventListener('keydown',handleKeyDown)
    buildGrid()
    buildKeyboard()


    function handleKeyDown(e) {
        if(e.ctrlKey || e.metaKey || e.altKey) return
        let letter = e.key
        if(letter == 'Enter') {
            //ToDo
            if(currentAttempt.length < 5) return
            attempts.push(currentAttempt)
            currentAttempt = ''
        }
        else if (letter === 'Backspace') {
            currentAttempt = currentAttempt.slice(0,currentAttempt.length - 1)
        }
        else if (/^[a-z]$/.test(letter)){
            currentAttempt += letter
        }
        updateGrid()
    }

    
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
    
    function updateGrid() {
        let row = grid.firstChild
        for(let attempt of attempts) {
            darawPassAttempt(row,attempt)
            row = row.nextSibling
        }
        darawCurrentAttempt(row,currentAttempt)
    }
    function gameCheck(attempt) {
        if(attempt === secretWord) window.alert('ok')
    }

    function darawPassAttempt(row,attempt) {
        for (let i = 0; i < 5; i++) {
            let cell = row.children[i]
            cell.textContent = attempt[i]
            cell.style.backgroundColor = getBgColor(attempt,i)
        }        
    }

    function darawCurrentAttempt(row,attempt) {
        for (let i = 0; i < 5; i++) {
            let cell = row.children[i]
            cell.textContent = attempt[i]
            // cell.style.backgroundColor = getBgColor(attempt,i)
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

    function buildKeyboard() {
        buildKeyboardRow('qwertyuiop')
        buildKeyboardRow(['','a','s','d','f','g','h','j','k','l',''])
        buildKeyboardRow(['enter','z','x','c','v','b','n','m','del'])
    }

    function buildKeyboardRow(letters) {
        let row = document.createElement('div')
        row.className = 'keyboard-row'
        for(let letter of letters) {
            let button = document.createElement('button')
            button.textContent = letter
            if(letter == '') button.className = 'spacer-half'
            row.appendChild(button)
        }
        keyboard.appendChild(row)
    }
})