/*******************************************************************************

    Variables

********************************************************************************
 this table represent the desk. It's filled with pairs of values representing
   the eight pairs of different cards
*******************************************************************************/

let timer = 0;
let timerIntervalId = 0;
let moves = 0;
let desk = document.getElementsByClassName('picture');
let cards = document.getElementsByClassName('card');

const maxMoves = 48;
const twoStars = 32;
const oneStar =16;

/*const card = document.querySelector('.card');*/
const play = document.querySelector('#start-over');

/*******************************************************************************

    Functions

*******************************************************************************/

function changeTimer() {
  timer++;
  console.log(timer); // DEBUG only
}
/*******************************************************************************
    Shuffle the cards

    Generic algorythm found on internet to shuffle a list of objects)
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
*******************************************************************************/
function flipCard(card) {
  card.classList.toggle('front');
  card.classList.toggle('back');
  moves++;
  console.log(moves); // DEBUG
}
/*******************************************************************************
  Start the game:
    - Shuffle the deck
    - Wait until a card is clicked
*******************************************************************************/
function startGame() {
  let moves = 0;
  for (let card=0; card<16; card++){
    cards[card].classList.remove('front');
    cards[card].classList.add('back');
    };
  shuffleCards();
  for (let card=0; card<16;card++){
    cards[card].onclick = function(){
      flipCard(this);
    };
  };
  timer = 0;
  if(timerIntervalId != 0) {window.clearInterval(timerIntervalId);}
  timerIntervalId = window.setInterval(changeTimer, 1000);
  console.log(timerIntervalId); // DEBUG only
  console.log(desk);            // DEBUG only
}
/*******************************************************************************
  Game is loaded, just wait until player click on new Game
  This event stay active in order to allow player to abort a game and start a
  new one.
*******************************************************************************/
play.addEventListener('click', function(){startGame();
});

/*);
card.addEventListener('click', flipCard());*/
