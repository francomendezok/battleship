// Test Factories //
const { Ship } = require('../src/factories');
const { Gameboard } = require('../src/factories');
const { Player } = require('../src/factories');

// Ship //
test('create instance of Ship', () => {
    const ship = new Ship(3);
  
    expect(ship).toBeInstanceOf(Ship);
    expect(ship.size).toBe(3);
    expect(ship.hit).toBe(0);
    expect(ship.sunk).toBe(false);
  });


test('hit() should increment the hit count', () => {
  const ship = new Ship(3);
  let result = ship.registerHit();
  expect(result).toBe(1);
});

test('isSunk() should return true if the ship is sunk', () => {
  const ship = new Ship(3);
  ship.registerHit();
  ship.registerHit();
  ship.registerHit();
  expect(ship.isSunk()).toBe(true);
});

test('isSunk() should return false if the ship is not sunk', () => {
  const ship = new Ship(3);
  ship.registerHit();
  ship.registerHit();
  expect(ship.isSunk()).toBe(false);
});

// Gameboard // 
describe('Gameboard', () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
    gameboard.createBoard();
  });

  test('creates a game board of default size 8x8', () => {
    const board = gameboard.getBoard();
    expect(Object.keys(board)).toHaveLength(64);
  });

  test('adds a ship to the game board', () => {
    const ship = ['0,0', '0,1', '0,2'];
    gameboard.placeShip(3, ship);
    const board = gameboard.getBoard();

    for (const coordinate of ship) {
      expect(board[`${coordinate}`].hasShip).toBe(true);
    }

    const ships = gameboard.getShips();
    expect(ships).toHaveLength(1);
  });

  test('check validity', () => {
    const ship = ['0,0', '0,1', '0,8'];
    let result = gameboard.placeShip(3, ship);
    
    expect(result).toBe('No Valid');
  });

  test('receives an attack and registers a hit', () => {
    const ship = ['0,0', '0,1', '0,2'];
    gameboard.placeShip(3, ship);
    const attackedCoordinate = '0,0';
    gameboard.receiveAttack(attackedCoordinate);

    const board = gameboard.getBoard();
    expect(board[attackedCoordinate].attacked).toBe(true);

    const ships = gameboard.getShips();
    expect(ships[0].hit).toBe(1);
  });

  test('receives a missed attack', () => {
    const attackedCoordinate = '0,7';
    gameboard.receiveAttack(attackedCoordinate);

    const board = gameboard.getBoard();
    expect(board[attackedCoordinate].missed).toBe(true);
  });

  test('checks if all ships are sunk', () => {
    const ship1 = ['0,0', '0,1', '0,2'];
    const ship2 = ['0,3', '0,4', '0,5'];
    gameboard.placeShip(3, ship1);
    gameboard.placeShip(3, ship2);

    // Attack and sink the first ship
    gameboard.receiveAttack('0,0');
    gameboard.receiveAttack('0,1');
    gameboard.receiveAttack('0,2');

    expect(gameboard.allSunk()).toBe(false);

    // Attack and sink the second ship
    gameboard.receiveAttack('0,3');
    gameboard.receiveAttack('0,4');
    gameboard.receiveAttack('0,5');

    expect(gameboard.allSunk()).toBe(true);
  });
});