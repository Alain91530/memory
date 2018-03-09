# Fend project #3 Memory Game #
### Description
Responsive memory game following this rules:

The deck have 8 pairs of cards. Each card show an animal.
You have to find all pairs in a limited number of moves.  
Click on a card to see it's face, then click on a second card.
This counts for one move. If the cards match, they stay face
up. Otherwise cards flip back face down.  
A timer shows how long you have been playing. Clicking on the
timer pauses the game.  
You win when all cards are face up.

### Installation
Clone repository or download files. Then open index.html in your browser.

### Realisation
Game is made with html5, CSS and JavaScript. It also uses Ubuntu Google font, awesome font with https://www.bootstrapcdn.com/.

Choice of the author is to make the game logic with JavaScript and the design with CSS. The JavaScript program acting only to set or unset the proper classes in accordance of the desired display. In rare occasions the content of the DOM needs to be changed:
* Cards shuffling
* Timer
* Star score

So the html sets a complete first design of a stopped game. Then while playing the JavaScript set the classes to change the design and flip the cards, display  matching or not matching cards, and so on...

Modal popups have been designed with 2 different methods:
* Rules popup using only CSS
* End of game popup CSS and JavaScript.
### Author
Alain CADENAT

### Credits
_Mockup_: https://www.udacity.com

_Backgounds of the game and cards_: https://www.pixabay.com

_Images of the cards_: https://www.dafont.com

### Limitations
The game needs a device with at least 270x530 pixels display. It can be hold horizontally or vertically.  
The game uses keyframes animations. In order to see them you need a recent browser i.e. for compatibility:
* Internet explorer: 10
* Chrome: 43
* Firefox: 16
* Opera: No on desktop, 10.1 on mobile
* Safari: 9

Never tested on very large screen like HD or 4k TV set.
### License
MIT License

Copyright (c) 2018 Alain CADENAT

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
