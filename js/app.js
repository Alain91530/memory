/*******************************************************************************

    Variables
*******************************************************************************/
let timer = 0;           // Number of seconds ellapsed playing a game
let firstCard;           // Variable used to store the node of the first card
let timerIntervalId = 0; // Store the value returned by setInterval
let flips = 0;           // A move = 2 flips
let hintLeft = 3;

/*  Table containing the deck. It's filled with pairs of html elements
    representing the value of the eight pairs of different cards              */
let deck = document.getElementsByClassName('picture');
//  Table containing the complete html elements of the cards of the deck
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

/*******************************************************************************
  Functions used as event listener:

    - changeTimer():
        called every second when game is started Add one second to timer,
        format and Display ellaped time in score pannel.

    - flipCard(card):
        Action: flip the clicked card and do all need checks accordind to the
        game logic (see comments before the function for details).
        Parameter: the DOM element clicked returned by the event.

    - notMatchingCards(cardOne,cardTwo):
        called to flip on the back side a non matching pair of cards. A time
        count is needed in order to let the animation goes to its end.

    - function hideHint(putItBack):
        Action: Put a card back face up after a hint. It's called by a timer
        in order to give some delay to the player to see the hint. If hint are
        still allowed, the proper event is added back.
        Parameter:
          putItBack: the DOM element of the card to be put back face up.

    - function hint(e):
        Action: fip a random back face card to front for 1 to 2 seconds to give
        a hint to player. On exit set a time out to hide the hint. Decrease the
        number of allowed hint.
        Parameter:
          e: keyboard event wich called it, used to retrieve the stroked key and
          display the hint or not.

    - startGame():
        Event listener for clicks on the play button in main window or in modal
        popup at the end of the game. It initialize everything to have a clean
        shuffled deck and then set up the logic of the game:
            - Event on click on cards.
            - Interval for the timer.
            - Event to pause the game on click of the timer.
            - Event to show a hint.

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

//  Adding a leading 0 if needed

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

// Store the game in local storage

  storeGame ();
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
  // Remove the change of cursor on facing up cards
  card.target.classList.toggle('clickable');
  // Check that the click was on a backside card
  if (card.target.classList.contains('back')){
    // Show the face of the card
    card.target.classList.add('front');
    card.target.classList.remove('back');
    // If the card is the 2nd of a move we need to increase the moves number
    if ((flips++)%2) {
      moveScore.textContent = "Moves: "+(flips/2);
      // Then we check if the stars score needs to be changed
      switch (flips) {
        case twoStars: {
          stars[2].classList.replace('fa-star','fa-minus');
          break;
        }
        case oneStar: {
          stars[1].classList.replace('fa-star','fa-minus');
          break;
        }
        // we can't Stop the game now: it might be the last matching pair
        case maxFlips: {
          stars[0].classList.replace('fa-star','fa-minus');
          break;
        }
      };
      // Checking if it's a matching pair
      if (card.target.querySelector('h2').textContent==firstCard.querySelector('h2').textContent) {
        card.target.classList.add('matching');
        firstCard.classList.add('matching')
        // Checking if it's the las pair we need to win
        if (document.getElementsByClassName('matching').length==16){
          setTimeout(endGame(true),1700);
        };
      }
      // Current pair doesn't match
      else {
        // Remove the event on click during animation
        makeCardsflippable(false);
        // Do the animation on the pair
        card.target.classList.add('flipping');
        firstCard.classList.add('flipping');
        // Set the time out to flip back the cards at the en of the animation
        setTimeout(notMatchingCards, 1500, firstCard, card.target);
        // Check if the last allowed move is reached and ends the game if so
        if(flips==maxFlips){
          setTimeout(endGame(false),1700);
        };
      };

    }
    // It was the 1st card of a move just store it to be able to compare it to
    // next card flipped and toggle the cursor change on hover to not clickable
    else {
      firstCard = card.target;
      card.target.classList.toggle('clickable');
    };
  };
}

/*******************************************************************************
    Function to hide a hint avec a short delay
    If the number max of hints is reached the event to display hints is not set
    again.
*******************************************************************************/

function hideHint(putItBack) {
  for (let c=0; c<16; c++){
    document.addEventListener('click',flipCard);
    putItBack.classList.remove('front');
    putItBack.classList.add('back');
  }
  if ((hintLeft)>0) {document.addEventListener('keydown',hint)};
}

/*******************************************************************************
  Event listener on stroke of <esc> key
  Flip a random card in thos which are still face down for 1 to 2 seconds
  Cards are made unclickable during that (event removed, cursor change disable)
  in order to avoid any problem in the game logic.
*******************************************************************************/

function hint(e){
  let backsideCards=document.getElementsByClassName('back')
  let randomCard = Math.floor(Math.random()*(backsideCards.length));
  let hintCard = backsideCards[randomCard];
  if (e.which===27) {
    hintCard.classList.add('front');
    hintCard.classList.remove('back');
    document.removeEventListener('keydown',hint);
    for (let c=0; c<16; c++){
      document.removeEventListener('click', flipCard);
    }
    hintLeft--;
    setTimeout(hideHint, 1000, hintCard);
  }
}

/*******************************************************************************
    Function called by a time count
    It hides back the cards of a move after the animation. The time out calling
    it allows the time for the animation to be seen.
*******************************************************************************/

function notMatchingCards(cardOne,cardTwo){
  cardOne.classList.remove('flipping');
  cardTwo.classList.remove('flipping');
  cardOne.classList.remove('front');
  cardTwo.classList.remove('front');
  cardOne.classList.add('back');
  cardTwo.classList.add('back');
  makeCardsflippable(true);
}

/*******************************************************************************
    Start the game:
      - Shuffle the deck
      - Wait until a card is clicked
*******************************************************************************/
function startGame() {

// Reset the number of cards flipped
  flips = 0;
  hintLeft = 3;

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

/* Shuffle or restore the card deck.
   If it's a new game shuffle and set timer and moves to 0 and start it
   otherwise restore the game and put it in paused mode.                 */

if (localStorage.getItem('saved')=="true") {
  restoreGame();
  document.getElementById('game-paused').classList.remove('hide')
}
else {
  storeGame();
  shuffleCards();
  timer = 0;
  moveScore.textContent = "Moves: 0";
  timerScore.textContent = "00h00m00s";
  // Stop the timer if it isn't 1st of session, to avoid to have more than 1
  if(timerIntervalId != 0) {window.clearInterval(timerIntervalId);}
  // Start a timer each second pointing to the function wich increase time played
    timerIntervalId = window.setInterval(changeTimer, 1000);
}

/* Set an event on a click on timer  to pause the game.
   And and add clickable class to have a changing cusor hover                  */

  document.getElementById('time').addEventListener('click',function(){
    window.clearInterval(timerIntervalId);
    document.getElementById('game-paused').classList.remove('hide');
    document.getElementById('game-saved').classList.add('hide');
  });
  document.getElementById('time').classList.add('clickable');

// Set an event to get a hint when <esc> is pressed.

  document.addEventListener('keydown',hint);

// Hide an eventual previous end of game modal popup.

  document.getElementById('end-game').classList.add('hide');

// Set an event listener for the click on the cards.

  makeCardsflippable(true);
}
function restoreGame() {
  timer = localStorage.getItem('timer');
  firstCard = localStorage.getItem('firstCard');
  flips = localStorage.getItem('flips');
  hintLeft = localStorage.getItem('hintLeft');

  document.getElementById('deck').innerHTML = JSON.parse(localStorage.getItem('deck'));
}

function storeGame() {
  localStorage.setItem('saved',true);
  localStorage.setItem('timer', timer);

  localStorage.setItem('flips',flips);
  localStorage.setItem('hintLeft',hintLeft);

  localStorage.setItem('deck',JSON.stringify(document.getElementById('deck').innerHTML));
}
/*******************************************************************************
  Functions to be called for repetitive actions of the logic of the Game

    endGame(win):
      Action: modifify the DOM to display the end of game modal popup.
      Stop the timer and put all cards front side up.
      Parameter: win, boolean to set the rpoper popup in accordance of the state
      game.

    makeCardsflippable(allowed):
      Action: add or remove an event on all DOM's element of the class .card
      according to the parameter.
      Parameter: allowed
        Boolean, true the cards are clickble, false they aren't.

    shuffleCards():
      generic function to shuffle any object which can be enumarated.
      algorythm was found on the net on several website.
*******************************************************************************/

/*******************************************************************************
    End a game
    The function sets the html of the modal popup at the end of a game.
    If "win" is true, the winning popup with score is set.
    If "win" is false, the popup just show a sad emoji.
*******************************************************************************/

function endGame(win) {
  let winHtml;
  if (win) {
// Setup a winning popup.
    winHtml = "<h2>Well done!</h2>";
    document.getElementById('result').innerHTML = winHtml;
    winHtml = "<h3>Done in "+document.getElementById('time').textContent+"</h3>";
    winHtml = winHtml+"<h3> You made it in "+flips/2+" moves";
    winHtml = winHtml+ "<h3>Your final score is </h3>";
    winHtml = winHtml+document.getElementById('stars').innerHTML;
    winHtml = winHtml+"<p><img class=\"emoji\" src=\"img/happy.svg\" alt=\"happy face\"></p>";
    document.getElementById('final-score').innerHTML = winHtml;
  }
// Setup a loosing popup.
  else {
    winHtml = "<h2>Game over!!!</h2>";
    document.getElementById('result').innerHTML = winHtml;
    winHtml = "<h3>Too many moves!</h3>";
    winHtml = winHtml+"<img src=\"img/sad.svg\" alt=\"sad face\">";
    document.getElementById('final-score').innerHTML = winHtml;
  };
// Show the popup.
  document.getElementById('end-game').classList.remove('hide');
// Stop timer.
  window.clearInterval(timerIntervalId);
// Flip all cards front side up.
  for (let card=0; card<16; card++){
    cards[card].classList.remove('back');
    cards[card].classList.add('front');
  }
// Set local storage to no pending game stored
  localStorage.setItem('saved', false);
}

/*******************************************************************************
  Function for setting or unsetting event on clicks on cards accordind to
  the phase of the game. The function is used to avoid clicks on cards during
  animations.
  If "allowed" is true thi envent is set on all cards of the deck.
  If "allowed" is false the event is removed.
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
    Shuffle the cards
    (Generic algorythm found on internet to shuffle a list of objects)
*******************************************************************************/

function shuffleCards() {
  for (let card = deck.length-1; card > 0; card--){
    // pick a random position in the deck
    let randomCard = Math.floor(Math.random()*(card+1));
    // swap deck[posion] and deck[rendomPosition]
    let saveCard = deck[card].textContent;
    deck[card].textContent = deck[randomCard].textContent;
    deck[randomCard].textContent = saveCard;
  };
}

/*******************************************************************************
                        Main code for the game
*******************************************************************************/

/*******************************************************************************
  Game is loaded by html and css, just wait until player click on new game or
  stop at the end of a game.
  This event stay active in order to allow player to abort a game and start a
  new one.
*******************************************************************************/

play[0].addEventListener('click', startGame); // Event for the button in game
play[1].addEventListener('click', startGame); // Event for the button in popup

/* Set the event to stop playing after a game. The function on this events
   remove the event on card's click and change the cursor on card's hover     */

document.querySelector('.stop').addEventListener('click', function() {
  makeCardsflippable(false);
  /* The function when game is just stopped hides the popup, change the cursor
     and flip all cards face up whithout changing colour of not found pairs   */
  document.getElementById('end-game').classList.add('hide');
  for (let card=0; card<16; card++){
    cards[card].classList.remove('clickable');
    cards[card].classList.remove('back');
    cards[card].classList.add('front');
    };
});

// Set events to resume or restart game after pausing by clicking on timer

document.getElementById('resume').addEventListener('click', function(){
  timerIntervalId = window.setInterval(changeTimer, 1000);
  document.getElementById('game-paused').classList.add('hide');
})

document.getElementById('restart').addEventListener('click', function(){
  localStorage.saved = "false";
  document.getElementById('game-paused').classList.add('hide');
  startGame();
})

// If a game is stored, start it in paused mode
if (localStorage.saved=="true") {
  startGame();
}
