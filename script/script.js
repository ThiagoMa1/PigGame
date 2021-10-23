'use strict';
// começa com o jogador da <, o jogador roda o dado e o valor do dado acumula no current até cair 1 e resetar e passar a vez, o jogador pode guardar seus pontos clicando em hold e passando a vez

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const curr0El = document.querySelector('#current--0');
const curr1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
// Starting conditions
// reset
const reset = function () {
    diceEl.classList.add('hidden');
    score0El.textContent = 0;
    score1El.textContent = 0;

    currentScore = 0;
    activePlayer = 0;
    scores = [0, 0];
    playing = true;

    curr0El.textContent = 0;
    curr1El.textContent = 0;

    document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--winner');
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
};
reset();

// switchPlayer
const switchPlayer = function () {
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 1 ? 0 : 1;

    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// Rolling dice functionality
// 1. Generating a random dice roll
btnRoll.addEventListener('click', function () {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;
        diceEl.src = `./images/dice-${dice}.png`;
        // 2. Display dice = remove classlist
        diceEl.classList.remove('hidden');
        // Check for rolled 1(
        if (dice !== 1) {
            // Add dice to the current score
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent =
                currentScore;
        } else {
            // switch to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    // 1. Add current score to active player's score
    if (playing) {
        scores[activePlayer] += currentScore;

        document.querySelector(`#score--${activePlayer}`).textContent =
            scores[activePlayer];

        // 2. Check if player's score is > = 100
        playing = false;
        if (scores[activePlayer] >= 20) {
            // Finish the game
            diceEl.classList.add('hidden');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

// New Game
btnNew.addEventListener('click', reset);
