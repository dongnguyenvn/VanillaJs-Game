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

    let attemptsHistory = []
    let currentAttempt = ''
    let keyboardButton = new Map()


    window.addEventListener('keydown', handleKeyDown)
    buildGrid()
    buildKeyboard()


    function handleKeyDown(e) {
        if (e.ctrlKey || e.metaKey || e.altKey) return
        let letter = e.key
        handleKey(letter)
    }

    function handleKey(letter) {
        if(attemptsHistory.length === 6) return
        if (letter == 'Enter') {
            if (currentAttempt.length < 5) return
            attemptsHistory.push(currentAttempt)
            currentAttempt = ''
            updateKeyboard()
        }
        else if (letter === 'Backspace') {
            currentAttempt = currentAttempt.slice(0, currentAttempt.length - 1)
        }
        else if (/^[a-z]$/.test(letter)) {
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
        for (let attempt of attemptsHistory) {
            darawAttempt(row, attempt,false)
            row = row.nextSibling
        }
        darawAttempt(row, currentAttempt,true)
    }

    function darawAttempt(row, attempt,isCurrent) {
        for (let i = 0; i < 5; i++) {
            let cell = row.children[i]
            cell.textContent = attempt[i]
            if(!isCurrent) cell.style.backgroundColor = getBgColor(attempt, i)
        }
    }

    function getBgColor(attempt, i) {
        let correctLetter = secretWord[i]
        let attemptLetter = attempt[i]
        if (secretWord.indexOf(attemptLetter) === -1) {
            return '#3a3a3c'
        }
        if (correctLetter === attemptLetter) {
            return '#538d4e'
        }
        return '#b59f3b'
    }

    function buildKeyboard() {
        buildKeyboardRow('qwertyuiop')
        buildKeyboardRow(['', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ''])
        buildKeyboardRow(['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'del'])
    }

    function buildKeyboardRow(letters) {
        let row = document.createElement('div')
        row.className = 'keyboard-row'
        for (let letter of letters) {
            let button = document.createElement('button')
            if (letter == '') button.className = 'spacer-half'
            button.textContent = letter
            handleOnClickKeyboard(button, letter)
            keyboardButton.set(button,letter)
            row.appendChild(button)
        }
        keyboard.appendChild(row)
    }

    function handleOnClickKeyboard(button, letter) {
        if (letter == 'del') {
            button.onclick = () => {
                handleKey('Backspace')
            }
        } else {
            button.onclick = () => {
                handleKey(letter)
            }
        }
    }

    function updateKeyboard() {
        let bestColors = new Map()
        for(let attempt of attemptsHistory) {
            for(let i = 0 ; i < attempt.length ; i++) {
                let color = getBgColor(attempt,i)
                let bestColor = bestColors.get(attempt[i])
                bestColors.set(attempt[i],getBetterColor(color,bestColor))
            }
        }
        for(let [button,letter] of keyboardButton) {
            button.style.backgroundColor = bestColors.get(letter)
        }
    }

    function getBetterColor(a,b) {
        if(a === '#538d4e' || b === '#538d4e') {
            return '#538d4e'
        }
        if(a === '#b59f3b' || b === '#b59f3b') {
            return '#b59f3b'
        }
        else return '#3a3a3c'
    }
})