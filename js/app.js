/*******************************************************************************

    Variables

*******************************************************************************/
/* this table represent the desk. It's filled with pairs of values representing
   the eight pairs of different cards
*******************************************************************************/

let desk = document.getElementsByClassName('picture');
let cards = document.getElementsByClassName('card');

/*const card = document.querySelector('.card');*/
const play = document.querySelector('#start-over');

/*******************************************************************************

    Functions

*******************************************************************************/

/*******************************************************************************
    Shuffle the cards and put them face back
*******************************************************************************/
function shuffleCards() {
  for (let position = desk.length-1; position > 0; position--){
    // pick a random position in the desk
    let randomPosition = Math.floor(Math.random()*(position+1));
    // swap desk[posion] and desk[rendomPosition]
    let saveCard = desk[position].textContent;
    desk[position].textContent = desk[randomPosition].textContent;
    desk[randomPosition].textContent = saveCard;
    cards[position].classList.remove('front');
    cards[position].classList.add('back');
  };
}
/*******************************************************************************
    Flip the side of a card
*******************************************************************************/
function flipCard(c) {
  c.classList.toggle('front');
  c.classList.toggle('back');
  console.log("card clicked"); // debug only

}
/*******************************************************************************
  Start the game:
    - Shuffle the deck
    - Wait until a card is clicked
*******************************************************************************/
function startGame() {

  shuffleCards();
  for (let card=0; card<16;card++){
    cards[card].onclick = function(){
      flipCard(this);
    };
  }
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
