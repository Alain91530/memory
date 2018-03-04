/*******************************************************************************

    Variables

*******************************************************************************/
/* this table represent the desk. It's filled with pairs of values representing
   the eight pairs of different cards
*******************************************************************************/

let moves = 0;
let desk = document.getElementsByClassName('picture');
let cards = document.getElementsByClassName('card');

/*const card = document.querySelector('.card');*/
const play = document.querySelector('#start-over');

/*******************************************************************************

    Functions

*******************************************************************************/

/*******************************************************************************
    Shuffle the cards
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
  console.log(desk); // debug only
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
