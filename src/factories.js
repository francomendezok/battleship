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
            this.board[coordinate] = { coordinates: coordinate, attacked: false, missed: false, hasShip: false, ship: [] };
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
        if (size !== coordinates.length) return false;

        const ship = new Ship(size);
            for (let i = 0; i < coordinates.length; i++) {
                if (!this.hasShip(coordinates[i])) {
                    this.board[coordinates[i]].ship.push(coordinates);
                    this.board[coordinates[i]].hasShip = true;
                }
                else return false;
            }
            ship.addCoordinates(coordinates);
            this.addShip(ship);
            return true;
      }

      isMoveLegal (move) {
        return !this.board[move].attacked && !this.board[move].missed;
    }
        
    hasShip (coordinate) {
            return this.board[coordinate].hasShip;
        }

      placeEnemyShips (enemyBoard) {
            let coordinateCarrier = this.createCoordinates();
            let coordinateBattleship = this.createCoordinates();
            let coordinateCruiser = this.createCoordinates();
            let coordinateSubmarine = this.createCoordinates();
            let coordinateDestroyer = this.createCoordinates();

            // let array = this.boardArray();

            let carrier = enemyBoard.getAdjacents(enemyBoard, 5, coordinateCarrier);
            let battleship = enemyBoard.getAdjacents(enemyBoard, 4, coordinateBattleship);
            let cruiser = enemyBoard.getAdjacents(enemyBoard, 3, coordinateCruiser);
            let submarine = enemyBoard.getAdjacents(enemyBoard, 3, coordinateSubmarine);
            let destroyer = enemyBoard.getAdjacents(enemyBoard, 2, coordinateDestroyer);

            let ships = [carrier, battleship, cruiser, submarine, destroyer];
            let sizes = [5,4,3,3,2];
            let filtered = [];

            for (let i = 0; i < ships.length; i++) {
                let temp = ships[i].filter(pos => pos.length === sizes[i]);
                filtered.push(temp);
            }



            filtered.forEach(setOfCoordinates => { 
                this.placeShip(setOfCoordinates[0].length, setOfCoordinates[0]);
                
                // setOfCoordinates.forEach(coordinates => {
                //     // let affirmative = coordinates.every(position => !this.hasShip(position));
                //     this.placeShip(coordinates.length, coordinates);
                //     // coordinates.forEach(position => {
                //     // })
                // });
            });  
      };

      createCoordinates () {
        let num1 = Math.floor(Math.random() * 8); 
        let num2 = Math.floor(Math.random() * 8); 
        let result = `${num1},${num2}`;

        if (!this.hasShip(result)) return result;

        else {
            while (this.hasShip(result)) {
                num1 = Math.floor(Math.random() * 8); 
                num2 = Math.floor(Math.random() * 8); 
                result = `${num1},${num2}`;
            }
        return result;
        }
    }

      getAdjacents (board, size, coordinates) {
        let arrayBoard = board.boardArray();
        let adjacents = [[],[]];
        // let up = 8;
        let right = 1;
        let down = 8;
        // let left = 1;
        let index = 0;

        // get index //
        for (let j = 0; j < arrayBoard.length; j++) {
            if (arrayBoard[j].coordinates === coordinates) {
                index = j;
                break;
            }
        }

        for (let i = 0; i < size; i++) {
            // 2 adjacents // 
            // if (arrayBoard[index - up]) {
            //     let split = coordinates.split(',');
            //     let place = arrayBoard[index - up].coordinates;
            //     let placeSplit = place.split(',');
            //     if (place && place.includes(split[1])) {
            //         adjacents[0].push(arrayBoard[index - up].coordinates);
            //         up += 8;
            //     }
            // }
            if (arrayBoard[index + right]) {
                let split = coordinates.split(',');
                let place = arrayBoard[index + right].coordinates;
                let placeSplit = place.split(',');
                if (place && placeSplit[0] === split[0]) {
                    adjacents[0].push(arrayBoard[index + right].coordinates);
                    right++;
                }
            }
            if (arrayBoard[index + down]) {
                let split = coordinates.split(',');
                let place = arrayBoard[index + down].coordinates;
                let placeSplit = place.split(',');
                if (place && place.includes(split[1])) {
                    adjacents[1].push(arrayBoard[index + down].coordinates);
                    down += 8;
                }
            }
            // if (arrayBoard[index - left]) {
            //     let split = coordinates.split(',');
            //     let place = arrayBoard[index - left].coordinates;
            //     let placeSplit = place.split(',');
            //     if (place && placeSplit[0] === split[0]) {
            //         adjacents[3].push(arrayBoard[index - left].coordinates);
            //         left++;
            //     }
            // }
        }
        return adjacents;
    }

    hasAllShipsPlaced () {
        return this.ships.length === 5;
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

      boardArray () {
        const obj = this.board;
        const array = [];

        for (let key in obj) {
            array.push(obj[key]);
          }
          return array;
      }
}

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


module.exports = {Ship, Gameboard, Player};