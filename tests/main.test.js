// Test Factories //
const { Ship } = require('../src/factories');
const { Gameboard } = require('../src/factories');
const { Player } = require('../src/factories');


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
