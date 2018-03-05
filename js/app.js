/*******************************************************************************

    Variables

********************************************************************************
 this table represent the desk. It's filled with pairs of values representing
   the eight pairs of different cards
*******************************************************************************/

let timer = 0;
let timerIntervalId = 0;
let flips = 0;           // A move = 2 flips
let desk = document.getElementsByClassName('picture');
let cards = document.getElementsByClassName('card');

const maxFlips = 48;
const oneStar = 32;
const twoStars =16;

/*const card = document.querySelector('.card');*/
const play = document.querySelector('#start-over');

/*******************************************************************************

    Functions

*******************************************************************************/

function changeTimer() {
  timer++;
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
*******************************************************************************/
function flipCard(card) {
  card.classList.toggle('front');
  card.classList.toggle('back');
  if ((flips++)%2) {
    console.log("tour ", flips/2);    // DEBUG only
    switch (flips) {
      case twoStars: {
        console.log("Plus que deux étoiles")
        break;
      }
      case oneStar: {
        console.log("Plus qu'une étoile");
        break;
      }
      case maxFlips: {
        console.log("Fin du jeu");
        break;
      }
    }
  };
  console.log(flips);                 // DEBUG only
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
  /*
    Reset the timer if any was running and start a new one
                                                                              */
  timer = 0;
  if(timerIntervalId != 0) {window.clearInterval(timerIntervalId);}
  timerIntervalId = window.setInterval(changeTimer, 1000);
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
