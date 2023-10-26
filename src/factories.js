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
            this.board[coordinate] = { attacked: false, missed: false, hasShip: false, ship: [] };
        }
        }
        return this.board;
      }

      isValid (coordinates) {
        let arr = coordinates.split(',');
        let a = Number(arr[0]);
        let b = Number(arr[1]);


        return a >= 0 && a <= 7 && b >= 0 && b <= 7;
      }

      getBoard() {
        return this.board;
      }

      addShip (ship) {
        this.ships.push(ship);
      }

      placeShip (size, coordinates) {
        if (size !== coordinates.length) return 'Size and coordinates length should be equal';

        const ship = new Ship(size);
            for (let i = 0; i < coordinates.length; i++) {
                if (this.isValid(coordinates[i])) {
                    this.board[coordinates[i]].ship.push(coordinates);
                    this.board[coordinates[i]].hasShip = true;
                }
                else if (!this.isValid(coordinates[i])) return 'No Valid';
            }
        ship.addCoordinates(coordinates);
        this.addShip(ship);
            return this.board;
      }

      isMoveLegal (move) {
        return !this.board[move].attacked && !this.board[move].missed;
    }

      placeEnemyShips (board) {
            let carrier = this.createCoordinates(5);
            let battleship = this.createCoordinates(4);
            let cruiser = this.createCoordinates(3);
            let submarine = this.createCoordinates(3);
            let destroyer = this.createCoordinates(2);
      }

      createCoordinates (size) {
        let num1 = Math.floor(Math.random() * 8); 
        let num2 = Math.floor(Math.random() * 8); 
        let result = `${num1},${num2}`;
        let coordinates = [];

        if (this.isMoveLegal(result)) coordinates.push(result);
            //check if hasShip, not attacked nor missed //
        else {
            while (!this.isMoveLegal(result)) {
                num1 = Math.floor(Math.random() * 8); 
                num2 = Math.floor(Math.random() * 8); 
                result = `${num1},${num2}`;
            }
        }

        let split = result.split(',');

        coordinates.push(result);

        for (let i = 0; i < size - 1; i++) {
            let random = Math.floor(Math.random() * 2); 
            let key = split[random];
            
            let possibilities = [];
            // 4 get adjacents // 
            
        }
        return coordinates;
    }

      getAdjacents (size, coordinates) {
        // 4,4 //
        let adjacents = []; 
        let lines = [];
        let split = coordinates.split(',');
        
        for (let j = 0; j < 4; j++) {
            for (let i = 0; i < size; i++) {
                let [x,y] = split;
                let first = `${x}, ${y++}`;
                let second = `${x}, ${y--}`;
                let third = `${x++}, ${y}`;
                let fourth = `${x--}, ${y}`;

                lines.push(first, second, third, fourth);
            }

        }
            
            
    }

      receiveAttack (coordinates) {
        let str = `${coordinates}`;

        if (this.board[str].attacked || this.board[str].missed) return;

        if (this.board[str].hasShip) {
            this.board[str].attacked = true;
            this.ships.forEach(ship => {
                if (ship.coordinates[0].includes(str)) {
                    ship.registerHit();
                    if (ship.isSunk()) ship.sunk = true;
                }
            });
        }
            else {
                this.board[str].missed = true;
            }

            return true;
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
board.placeShip(3, ['7,1','7,2','7,3']);
board.placeShip(3, ['0,1', '0,2','0,3'])
board.receiveAttack('0,1');
board.receiveAttack('0,2');
board.receiveAttack('0,3');
board.receiveAttack('7,1');
board.receiveAttack('7,2');
board.receiveAttack('7,3');


// Player Class //
class Player {
    constructor (gameboard) {
        this.gameboard = gameboard;
    }

    isMoveLegal (move) {
        return !this.gameboard.board[move].attacked && !this.gameboard.board[move].missed;
    }


    makeRandomMove () {
        let num1 = Math.floor(Math.random() * 8); 
        let num2 = Math.floor(Math.random() * 8); 
        let result = `${num1},${num2}`;

        if (this.isMoveLegal(result)) return result;

        else {
            while (!this.isMoveLegal(result)) {
                num1 = Math.floor(Math.random() * 8); 
                num2 = Math.floor(Math.random() * 8); 
                result = `${num1},${num2}`;
            }
        }
        return result;
    }
}

const play = new Player(board);


module.exports = {Ship, Gameboard, Player};