/*
Steps 
    1. Genereate a number between 1 and 100
    2. Indicate on which turn the player is
    3. Get the number the player chose
    4. Display the number chosen by the player
    5. Compare the two numbers :
        - If the number is correct : 
            - Diplay to the player : you win
            - Don't allow the player to enter another number
            - Allow the player to play again
        - If the number is incorrect and there is no turn left :
            - Display to the player : you lost
            - Display the correct number
            - Don't allow the player to enter another number
            - Allow the player to play again
        - If the number is incorrect and there is still turns left :
            - Indicate to the player if the number is too high or too low
            - Increase the number of turns by 1
    6. Restart game :
        - Reset everything
*/


/* ==============================
Variables set up 
============================== */
randomNumber = Math.floor(Math.random()*101);

const playerNumber = document.getElementById('playerNumber');
const turns = document.getElementById('turns');
const lastNumberChosen = document.getElementById('lastNumberChosen');
const lowerOrHigher = document.getElementById('lowerOrHigher');
const winOrLoose = document.getElementById('winOrLoose');
const submitButton = document.getElementById('submitButton');
const inputValidity = document.getElementById('inputValidity');
let inputValidityYorN;
let continuePlaying = true;

const maxTurns = 10;
let turnsCount = 1;

regexGuessNumber = /^([1-9][0-9]?|100)$/

let higherLine = `
Huh huh. It's higher. Try again
<img class="lowerOrHigherImg" src="assets/img/arrow-up-right.svg" alt="Icone de flèche qui descend vers la droite">
`;

let lowerLine = `
Huh huh. It's lower. Try again
<img class="lowerOrHigherImg" src="assets/img/arrow-down-right.svg" alt="Icone de flèche qui descend vers la droite">
`;


/* ==============================
Display turns counts when page loaded 
============================== */
turns.innerHTML = turnsCount;

/* ==============================
Check validity of the input FUNCTION 
Keyup EVENT LISTENER 
============================== */
playerNumber.addEventListener('keyup', () => {
    let playerNumberValue = playerNumber.value;
    if (playerNumberValue.match(regexGuessNumber)) {
        inputValidity.innerText = '';
        inputValidityYorN = true;
    }
    else {
        inputValidity.innerText = 'You got to choose a number between 1 and 100.';
        inputValidityYorN = false;
    }
})

/* ==============================
Onclick EVENT LISTENER 
============================== */
submitButton.addEventListener('click', () => {
    if((inputValidityYorN === true) && (continuePlaying === true)) {
        displayNumberChosen();
        checkGuess(); 
    }

})

/* ==============================
Display number chosen FUNCTION 
============================== */
displayNumberChosen = () => {
    let playerNumberValue = playerNumber.value;
    lastNumberChosen.innerText = playerNumberValue;
    lastNumberChosen.classList.add('bgDark');
}

/* ==============================
Check guess FUNCTION 
============================== */
checkGuess = () => {
    let playerNumberValue = parseInt(playerNumber.value);

    if(playerNumberValue === randomNumber) {
        lowerOrHigher.innerText = '';
        winOrLoose.innerText = 'You win ! You guessed the number right';
        turns.innerHTML = turnsCount;
        continuePlaying = false;
        startAgain();
    }
    else if ((playerNumberValue < randomNumber) && (turnsCount < maxTurns)) {
        lowerOrHigher.innerHTML = higherLine;
        turns.innerHTML = turnsCount;
        turnsCount ++;
    }
    else if ((playerNumberValue > randomNumber) && (turnsCount < maxTurns)) {
        lowerOrHigher.innerHTML = lowerLine;
        turns.innerHTML = turnsCount;
        turnsCount ++;
    }
    else {
        lowerOrHigher.innerText = '';
        winOrLoose.innerText = 'You lost ... Wanna try again ?'
        turns.innerHTML = turnsCount;
        continuePlaying = false;
        startAgain();
    }
}

/* ==============================
Start again FUNCTION 
============================== */

startAgain = () => {
    let resetButton = document.createElement('button');
    resetButton.textContent = 'Play again';
    resetButton.classList.add('orangeButton');
    document.getElementById('resultsDiv').appendChild(resetButton);
    resultsDiv.classList.add('resultDiv');
    resetButton.addEventListener('click', resetGame)
}

/* ==============================
Reset game FUNCTION 
============================== */

resetGame = () => {
    window.location.reload()

}
