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
const maxFlips = 32;
const oneStar = 24;
const twoStars = 16;

const play = document.getElementsByClassName('start-over');

/*******************************************************************************

    Functions

*******************************************************************************/

/*******************************************************************************
  Function called every second which format the string to display
*******************************************************************************/

function changeTimer() {
/*
    Convert the timer in a string with xx:xx:xx format to change de DOM
                                                                              */
  let hrs = Math.trunc(timer/3600);
  let mins = (Math.trunc(timer/60)-(hrs*60));
  let secs = (timer-((hrs*3600)+(mins*60)));
  if (hrs<10) {
    hrs = "0"+hrs+'h';
  }
  else {
    hrs = hrs+"h";
  };
  if (mins<10) {
    mins = "0"+mins+"m";
  }
  else {
    mins = mins+"m";
  };
  if (secs<10) {
    secs = "0"+secs+"s";
  }
  else {
    secs = secs+"s";
  };
  timer++;

// Change the DOM to display the timet value

  timerScore.textContent = hrs+mins+secs;
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
//  card.target.classList.toggle('clickable');
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
          break;
        }
      };
      if (card.target.querySelector('h2').textContent==firstCard.querySelector('h2').textContent) {
        card.target.classList.add('matching');
        firstCard.classList.add('matching')
        if (document.getElementsByClassName('matching').length==16){
          setTimeout(endGame(true),1700);
        };
      }
      else {
        makeCardsflippable(false);
        card.target.classList.add('flipping');
        firstCard.classList.add('flipping');
        setTimeout(notMatchingCards, 1700, firstCard, card.target);
        if(flips==maxFlips){
          setTimeout(endGame(false),1700);
        };
      };

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
  makeCardsflippable(true);

}

function endGame(win) {
  let winHtml;
  if (win) {
    winHtml = "<h2>Well done!</h2>";
    document.getElementById('result').innerHTML = winHtml;
    winHtml = "<h3>Done in "+document.getElementById('time').textContent+"</h3>";
    winHtml = winHtml+"<h3> You made it in "+flips/2+" moves";
    winHtml = winHtml+ "<h3>Your final score is </h3>";
    winHtml = winHtml+document.getElementById('stars').innerHTML;
    winHtml = winHtml+"<p><img class=\"emoji\" src=\"img/happy.svg\" alt=\"happy face\"></p>";
    document.getElementById('final-score').innerHTML = winHtml;
  }
  else {
    winHtml = "<h2>Game over!!!</h2>";
    document.getElementById('result').innerHTML = winHtml;
    winHtml = "<h3>Too many moves!</h3>";
    winHtml = winHtml+"<img src=\"img/sad.svg\" alt=\"sad face\">";
    document.getElementById('final-score').innerHTML = winHtml;
  };
  document.getElementById('end-game').classList.remove('hide');
  window.clearInterval(timerIntervalId);
  for (let card=0; card<16; card++){
    cards[card].classList.remove('back');
    cards[card].classList.add('front');
  }
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
    cards[card].classList.remove('matching');     // remove initial matching
    cards[card].classList.remove('notMatching');  // or not matching display
    cards[card].classList.remove('front');        // Put all cards on the
    cards[card].classList.add('back');            // back
    cards[card].classList.add('clickable');       // and the change cursor  over
    };

// Shuffle the card deck

//  shuffleCards();

// Set an event listener for the click on the cards.

  makeCardsflippable(true);

// Reset the timer if any was running and start a new one

  timer = 0;

// Stop the timer if it isn't the first game

  if(timerIntervalId != 0) {window.clearInterval(timerIntervalId);}

// Start a timer each second pointingn to the function wich increase time played

  timerIntervalId = window.setInterval(changeTimer, 1000);

// Reset time and moves to 0 score display and remove modal popup if any.

  moveScore.textContent = "Moves: 0";
  timerScore.textContent = "00h00m00s";
  document.getElementById('end-game').classList.add('hide');
}

/*******************************************************************************
  Function for setting or unsetting event on clicks on cards accordind to
  the phase of the game.
*******************************************************************************/

function makeCardsflippable(allowed) {
  if (allowed) {
    for (let card=0; card<16;card++){
      cards[card].addEventListener('click', flipCard);
    };
  }
  else {
    for (let card=0; card<16;card++){
      cards[card].removeEventListener('click', flipCard);
    };
  }
}

/*******************************************************************************
  Game is loaded by html and css, just wait until player click on new game or
  stop at the end of a game.
  This event stay active in order to allow player to abort a game and start a
  new one.
*******************************************************************************/

play[0].addEventListener('click', startGame);
play[1].addEventListener('click', startGame);

/* Set the event to stop playing after a game. The function on this events
   remove the event on card's click and change the cursor on card's hover     */

document.querySelector('.stop').addEventListener('click', function() {
  makeCardsflippable(false);
  document.getElementById('end-game').classList.add('hide');
  for (let card=0; card<16; card++){
    cards[card].classList.remove('clickable');
    };
});
