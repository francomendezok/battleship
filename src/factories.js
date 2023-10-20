// Ship Class //
class Ship {
    constructor (size) {
        this.size = size;
        this.hit = 0;
        this.sunk = false;
    }

    hit () {
        return this.hit += 1;
    }

    isSunk () {
        return this.hit === this.size;
    }
}


// Your ‘ships’ will be objects that include their length, the number of times they’ve been hit and whether or not they’ve been sunk.
// REMEMBER you only have to test your object’s public interface. Only methods or properties that are used outside of your ‘ship’ object need unit tests.
// Ships should have a hit() function that increases the number of ‘hits’ in your ship.
// isSunk() should be a function that calculates it based on their length and the number of ‘hits’. 


// Gameboard Class //

class Gameboard {
    constructor () {
        this.board = [];
    }
    
    createBoard(size = 8 ) {
        for (let i = 0; i < size; i += 1) {
          for (let j = 0; j < size; j += 1) {
            this.board.push([`${[i,j]}`, {hit: false}]);
        }
        }
        return this.board;
      }
}

let board = new Gameboard();
let result = board.createBoard();

// Note that we have not yet created any User Interface. We should know our code is coming together by running the tests. You shouldn’t be relying on console.log or DOM methods to make sure your code is doing what you expect it to.
// Gameboards should be able to place ships at specific coordinates by calling the ship factory function.
// Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
// Gameboards should keep track of missed attacks so they can display them properly.
// Gameboards should be able to report whether or not all of their ships have been sunk.


// Player Class //

class Player {
    constructor () {

    }

    isMoveLegal (move) {
        // if gameboard includes move && gameboard[move].hit return true;
    }

    makeRandomMove () {
        let num1 = Math.floor(Math.random() * 8); 
        let num2 = Math.floor(Math.random() * 8); 
        let result = [`${num1, num2}`];

        while (!isMoveLegal(result)) {
            num1 = Math.floor(Math.random() * 8); 
            num2 = Math.floor(Math.random() * 8); 
            result = [`${num1, num2}`];
        }
        
        return result;
    }
}


// Players can take turns playing the game by attacking the enemy Gameboard.
// The game is played against the computer, so make the ‘computer’ capable of making random plays. 
// The AI does not have to be smart, but it should know whether or not a given move is legal (i.e. it shouldn’t shoot the same coordinate twice).