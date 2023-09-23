const { describe, it } = require('node:test');
const expect = require('chai').expect;

const { sandCanGoDown, 
  sandCanGoDownLeft, 
  sandCanGoDownRight, 
  isEmpty, 
  isSandUnitAtInitialCoordinates, 
  dropAsManySandUnitsAsPossible, 
  drawPathsFromData } = require('./partOne');

describe('sandCanGoDown', () => {
  it('should return false if sand unit is at the bottom of the map', () => {
    const map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.']
    ];
    const sandUnitCoordinates = { x: 1, y: 2 };
    expect(sandCanGoDown(map, sandUnitCoordinates)).to.equal(false);
  });

  it('should return false if the next spot is a wall', () => {
    const map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '#', '.'],
    ];
    const sandUnitCoordinates = { x: 1, y: 1 };
    expect(sandCanGoDown(map, sandUnitCoordinates)).to.equal(false);
  });

  it('should return false if the next spot is another sand unit', () => {
    const map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', 'o', '.'],
    ];
    const sandUnitCoordinates = { x: 1, y: 1 };
    expect(sandCanGoDown(map, sandUnitCoordinates)).to.equal(false);
  });

  it('should return true if the next spot is empty', () => {
    const map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.']
    ];
    const sandUnitCoordinates = { x: 1, y: 1 };
    expect(sandCanGoDown(map, sandUnitCoordinates)).to.equal(true);
  });
});

describe('sandCanGoDownLeft', () => {
  it('should return false if sand unit is at the bottom of the map', () => {
    const map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.']
    ];
    const sandUnitCoordinates = { x: 0, y: 2 };
    expect(sandCanGoDownLeft(map, sandUnitCoordinates)).to.equal(false);
  });

  it('should return false if sand unit is at the left edge of the map', () => {
    const map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['#', '.', '.']
    ];
    const sandUnitCoordinates = { x: 0, y: 1 };
    expect(sandCanGoDownLeft(map, sandUnitCoordinates)).to.equal(false);
  });

  it('should return false if the next spot is a wall', () => {
    const map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['#', '#', '.']
    ];
    const sandUnitCoordinates = { x: 1, y: 1 };
    expect(sandCanGoDownLeft(map, sandUnitCoordinates)).to.equal(false);
  });

  it('should return false if the next spot is another sand unit', () => {
    const map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['o', '#', '.']
    ];
    const sandUnitCoordinates = { x: 1, y: 1 };
    expect(sandCanGoDownLeft(map, sandUnitCoordinates)).to.equal(false);
  });

  it('should return true if the next spot is empty', () => {
    const map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.']
    ];
    const sandUnitCoordinates = { x: 1, y: 1 };
    expect(sandCanGoDownLeft(map, sandUnitCoordinates)).to.equal(true);
  });
});

describe('sandCanGoDownRight', () => {
  it('should return false if sand unit is at the bottom of the map', () => {
    const map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.']
    ];
    const sandUnitCoordinates = { x: 2, y: 2 };
    expect(sandCanGoDownRight(map, sandUnitCoordinates)).to.equal(false);
  });

  it('should return false if sand unit is at the right edge of the map', () => {
    const map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '#']
    ];
    const sandUnitCoordinates = { x: 2, y: 1 };
    expect(sandCanGoDownRight(map, sandUnitCoordinates)).to.equal(false);
  });

  it('should return false if the next spot is a wall', () => {
    const map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '#', '#']
    ];
    const sandUnitCoordinates = { x: 1, y: 1 };
    expect(sandCanGoDownRight(map, sandUnitCoordinates)).to.equal(false);
  });

  it('should return false if the next spot is another sand unit', () => {
    const map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '#', 'o']
    ];
    const sandUnitCoordinates = { x: 1, y: 1 };
    expect(sandCanGoDownRight(map, sandUnitCoordinates)).to.equal(false);
  });

  it('should return true if the next spot is empty', () => {
    const map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.']
    ];
    const sandUnitCoordinates = { x: 1, y: 1 };
    expect(sandCanGoDownRight(map, sandUnitCoordinates)).to.equal(true);
  });
});

describe('isEmpty', () => {
  it('should return true if the spot is empty', () => {
    const map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.']
    ];
    const coordinates = { x: 1, y: 1 };
    expect(isEmpty(map, coordinates)).to.equal(true);
  });

  it('should return false if the spot is a wall', () => {
    const map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '#', '.']
    ];
    const coordinates = { x: 1, y: 2 };
    expect(isEmpty(map, coordinates)).to.equal(false);
  });

  it('should return false if the spot is another sand unit', () => {
    const map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', 'o', '.']
    ];
    const coordinates = { x: 1, y: 2 };
    expect(isEmpty(map, coordinates)).to.equal(false);
  });
});

describe('isSandUnitAtInitialCoordinates', () => {
  it('should return true if the sand unit is at the initial coordinates', () => {
    const sandUnitCoordinates = { x: 500, y: 0 };
    const sandInitialCoordinates = { x: 500, y: 0 };
    expect(isSandUnitAtInitialCoordinates(sandUnitCoordinates, sandInitialCoordinates)).to.equal(true);
  });
  it('should return false if the sand unit is not at the initial coordinates', () => {
    const sandUnitCoordinates = { x: 500, y: 1 };
    const sandInitialCoordinates = { x: 500, y: 0 };
    expect(isSandUnitAtInitialCoordinates(sandUnitCoordinates, sandInitialCoordinates)).to.equal(false);
  });
});

describe('dropAsManySandUnitsAsPossible', () => {
  it('should return the number of sand units dropped', () => {
    const map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.']
    ];
    const sandInitialCoordinates = { x: 1, y: 0 };
    expect(dropAsManySandUnitsAsPossible(map, sandInitialCoordinates)).to.equal(7);
  });
});
