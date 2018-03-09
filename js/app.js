/*******************************************************************************

    Variables
*******************************************************************************/
let timer = 0;           // Number of seconds ellapsed playing a game
let firstCard;           // Variable used to store the node of the first card
let timerIntervalId = 0; // Store the value returned by setInterval
let flips = 0;           // A move = 2 flips

/*  Table containing the desk. It's filled with pairs of html elements
    representing the value of the eight pairs of different cards              */
let desk = document.getElementsByClassName('picture');
//  Table containing the complete html elements of the cards of the desk
let cards = document.getElementsByClassName('card');
//  Elements for the score board (time, moves and stars)
let timerScore = document.getElementById('time');
let moveScore = document.getElementById('moves');
let stars = document.getElementsByClassName('fa');

// Differents stages of the game set as constants to be easy to change.
const maxFlips = 2;
const oneStar = 32;
const twoStars = 16;

const play = document.getElementsByClassName('start-over');

/*******************************************************************************

    Functions

*******************************************************************************/

function notMatchingTransition(formerCard, card){
  for (let i = 0; i<10; i++){
   formerCard.classList.toggle('flipping');
   card.classList.toggle('flipping');
   formerCard.classList.add('clickable');
   card.classList.add('clickable');
  };
}

/*******************************************************************************
  Function called every second which format the string to display
*******************************************************************************/

function changeTimer() {
/*
    Convert the timer in a string with xx:xx:xx format to change de DOM
                                                                              */
  let hrs = Math.trunc(timer/3600)+":";
  let mins = Math.trunc(timer/60)+":";
  let secs = timer-(parseInt(mins)*60);
  if ((hrs.length) == 2) {
    hrs = "0"+hrs;
  }
  else {
    hrs = hrs+":";
  };
  if ((mins.length) == 2) {
    mins = "0"+mins;
  }
  else {
    mins = mins+":";
  };
  secs=secs+""
  if ((secs.length) == 1) {
    secs = "0"+secs;
  };
  timer++;

// Change the DOM to display the timet value

  timerScore.textContent = "Time: "+hrs+mins+secs;
}
/*******************************************************************************
    Shuffle the cards
    (Generic algorythm found on internet to shuffle a list of objects)
*******************************************************************************/
function shuffleCards() {
  for (let card = desk.length-1; card > 0; card--){
    // pick a random position in the desk
    let randomCard = Math.floor(Math.random()*(card+1));
    // swap desk[posion] and desk[rendomPosition]
    let saveCard = desk[card].textContent;
    desk[card].textContent = desk[randomCard].textContent;
    desk[randomCard].textContent = saveCard;
  };
}
/*******************************************************************************
    Flip the side of a card
      This function is the heart of the game logic.
      It first checks if the card is front of back face
      If it's a front face card it does nothing
      Otherwise it put it on front and check if it's the second card of the
      move.
      If not the clickable class is removed to stop the change of cursor over it
      and the card is stored to be able to check for a pair on second card of
      the move.
      If yes it adds one to the flip count to remove stars in accordance with
      this number and then checks for a pair and let the card face up if it is.
      If not it flips the fomer card and this one back and set back the first
      card clickable.
*******************************************************************************/

function flipCard(card) {
  card.target.classList.toggle('clickable');
  if (card.target.classList.contains('back')){
    card.target.classList.add('front');
    card.target.classList.remove('back');
    if ((flips++)%2) {
      moveScore.textContent = "Moves: "+(flips/2);
      switch (flips) {
        case twoStars: {
          stars[2].classList.replace('fa-star','fa-minus');
          break;
        }
        case oneStar: {
          stars[1].classList.replace('fa-star','fa-minus');
          break;
        }
        case maxFlips: {
          stars[0].classList.replace('fa-star','fa-minus');
          setTimeout(endGame,1500);
          break;
        }
      };
      if (card.target.textContent==firstCard.textContent) {
        card.target.classList.add('matching');
        firstCard.classList.add('matching')
        setTimeout(endGame,1500);
      }
      else {
        card.target.classList.add('flipping');
        firstCard.classList.add('flipping');
        setTimeout(notMatchingCards, 1500, firstCard, card.target);
      /*  card.classList.add('back');
        firstCard.classList.add('back');
/*        card.classList.add('flipping');
        firstCard.classList.add('flipping');*/
      }
      if(flips==maxFlips){
      }
    }
    else {
      firstCard = card.target;
      card.target.classList.toggle('clickable');
    };
  };
}
function notMatchingCards(cardOne,cardTwo){
  cardOne.classList.remove('flipping');
  cardTwo.classList.remove('flipping');
  cardOne.classList.remove('front');
  cardTwo.classList.remove('front');
  cardOne.classList.add('back');
  cardTwo.classList.add('back');

}
function endGame() {
  document.getElementById('end-game').classList.toggle('hide');
  window.clearInterval(timerIntervalId);
}
/*******************************************************************************
  Start the game:
    - Shuffle the deck
    - Wait until a card is clicked
*******************************************************************************/
function startGame() {

// Reset the number of cards flipped
  flips = 0;

// Set the number of stars in the score pannel to 3
  for(let star=0; star<3; star++) {
    stars[star].classList.replace('fa-minus','fa-star');
  };

/* Put all the cards back up, remove matching and notMatching class (this class
   is use for the background color of the card) and finally set all cards at
   clickable in order to have the right cursor on it.                          */

  for (let card=0; card<16; card++){
    cards[card].classList.remove('matching');
    cards[card].classList.remove('notMatching');
    cards[card].classList.remove('front');
    cards[card].classList.add('back');
    cards[card].classList.add('clickable');
    };

// Shuffle the card deck

  shuffleCards();

// Set an event listener for the click on the cards.

  for (let card=0; card<16;card++){
    cards[card].addEventListener('click', flipCard)
  };

// Reset the timer if any was running and start a new one

  timer = 0;

// Stop the timer if it isn't the first game

  if(timerIntervalId != 0) {window.clearInterval(timerIntervalId);}

// Start a timer each second pointingn to the function wich increase time played

  timerIntervalId = window.setInterval(changeTimer, 1000);

// Reset time and moves to 0 score display.

  moveScore.textContent = "Moves: 0";
  timerScore.textContent = "Time: 00:00:00";
}

/*******************************************************************************
  Game is loaded by html and css, just wait until player click on new Game
  This event stay active in order to allow player to abort a game and start a
  new one.
*******************************************************************************/

play[0].addEventListener('click', function(){startGame();});
play[1].addEventListener('click', function(){startGame();});
