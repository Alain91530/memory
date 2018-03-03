/*******************************************************************************

    Variables

*******************************************************************************/
/* this table represent the desk. It's filled with pairs of values representing
   the eight pairs of different cards
*******************************************************************************/

let desk = [1, 1, 2 ,2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

const card = document.querySelector('.card');
const play = document.querySelector('h1');

/*******************************************************************************

    Functions

*******************************************************************************/

function shuffleCards() {
  for (let position = desk.length-1; position > 0; position--){
    // pick a random position in the desk
    let randomPosition = Math.floor(Math.random()*(position+1));
    // swap desk[posion] and desk[rendomPosition]
    let saveCard = desk[position];
    desk[position] = desk[randomPosition];
    desk[randomPosition] = saveCard;
  };
}

function flipCard() {
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
