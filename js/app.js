/*******************************************************************************

    Variables

*******************************************************************************/
/* this table represent the desk. It's filled with pairs of values representing
   the eight pairs of different cards
*******************************************************************************/

let desk = document.getElementsByClassName('picture');

const card = document.querySelector('.card');
const play = document.querySelector('#start-over');

/*******************************************************************************

    Functions

*******************************************************************************/

function shuffleCards() {
  for (let position = desk.length-1; position > 0; position--){
    // pick a random position in the desk
    let randomPosition = Math.floor(Math.random()*(position+1));
    // swap desk[posion] and desk[rendomPosition]
    let saveCard = desk[position].textContent;
    desk[position].textContent = desk[randomPosition].textContent;
    desk[randomPosition].textContent = saveCard;
  };
}

function flipCard() {
  card.classList.toggle('front');
  card.classList.toggle('back');
  console.log("card clicked"); // debug only

}

function startGame() {
  shuffleCards();
  card.onclick = function(){
    flipCard();
  };
  console.log(desk); // debug only
}

play.addEventListener('click', function(){startGame();
});

/*);
card.addEventListener('click', flipCard());*/
