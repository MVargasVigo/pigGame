'use strict';

//Selecting elements
const elementScore1 = document.getElementById('score--0');
const elementScore2 = document.getElementById('score--1');
const currentScore1El = document.getElementById('current--0');
const currentScore2El = document.getElementById('current--1');
const activePlayer0 = document.querySelector('.player--0');
const activePlayer1 = document.querySelector('.player--1');
const elementDice = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting conditions
elementScore1.textContent = 0;
elementScore2.textContent = 0;
elementDice.classList.add('hidden');

const scores = [0, 1];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  activePlayer0.classList.toggle('player--active');
  activePlayer1.classList.toggle('player--active');
};

//Rolling the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display dice
    elementDice.classList.remove('hidden');
    elementDice.src = `dice-${dice}.png`;
    //3. Check for 1: if true, switch to next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //Add current score to Active Player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //Check if score is 100.
    if (scores[activePlayer] >= 20) {
      playing = false;
      elementDice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
