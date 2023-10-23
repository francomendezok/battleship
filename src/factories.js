// Ship Class //
class Ship {
    constructor (size) {
        this.size = size;
        this.hit = 0;
        this.sunk = false;
        this.coordinates = [];
    }

    registerHit() {
        return this.hit += 1;
    }

    isSunk() {
        return this.hit === this.size;
    }

    addCoordinates (position) {
        this.coordinates.push(position);
    }
}

// Gameboard Class //
class Gameboard {
    constructor () {
        this.board = [] 
        this.ships = []
    }
    
    createBoard(size = 8 ) {
        for (let i = 0; i < size; i += 1) {
          for (let j = 0; j < size; j += 1) {
            const coordinate = `${i},${j}`;
            this.board[coordinate] = { hit: false, missed: false, hasShip: false, ship: [] };
        }
        }
        return this.board;
      }

      getBoard() {
        return this.board;
      }

      addShip (ship) {
        this.ships.push(ship);
      }

      placeShip (size, coordinates) {
        const ship = new Ship(size);
            for (let i = 0; i < coordinates.length; i++) {
               this.board[coordinates[i]].ship.push(coordinates);
               this.board[coordinates[i]].hasShip = true;
            }
        ship.addCoordinates(coordinates);
        this.addShip(ship);
            return this.board;
      }

      getShips () {
        return this.ships;
      }

      allSunk () {
        return this.ships.every(ship => ship.sunk === true);
      }
}


let board = new Gameboard();
board.createBoard();
board.placeShip(3, ['7,1', '7,2','7,3'])
board.placeShip(5, ['0,1', '0,2','0,3'])
board.ships[0].sunk = true;
board.ships[1].sunk = true;


// console.log(board.getShips()[0]);
console.log(board);

// Note that we have not yet created any User Interface. We should know our code is coming together by running the tests. You shouldn’t be relying on console.log or DOM methods to make sure your code is doing what you expect it to.
// Gameboards should be able to place ships at specific coordinates by calling the ship factory function.
// Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
// Gameboards should keep track of missed attacks so they can display them properly.
// Gameboards should be able to report whether or not all of their ships have been sunk.


// Player Class //

class Player {
    constructor (gameboard) {
        this.gameboard = gameboard;
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


module.exports = {Ship, Gameboard, Player};