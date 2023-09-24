const { describe, it } = require('node:test');
const expect = require('chai').expect;

const { sandCanGoDown, 
   } = require('./partOne');

describe('sandCanGoDown', () => {
  it('returns true if the sand can go down', () => {
    const map = new Set();
    const sandUnitCoordinates = { x: 500, y: 0 };
    expect(sandCanGoDown(map, sandUnitCoordinates)).to.equal(true);
  });

  it('returns false if the sand can go down', () => {
    const map = new Set();
    map.add('500,1');
    const sandUnitCoordinates = { x: 500, y: 0 };
    expect(sandCanGoDown(map, sandUnitCoordinates)).to.equal(false);
  });
});

describe('sandCanGoDownLeft', () => {
  it('returns true if the sand can go down left', () => {
    const map = new Set();
    const sandUnitCoordinates = { x: 500, y: 0 };
    expect(sandCanGoDownLeft(map, sandUnitCoordinates)).to.equal(true);
  });

  it('returns false if the sand can go down left', () => { 
    const map = new Set();
    map.add('499,1');
    const sandUnitCoordinates = { x: 500, y: 0 };
    expect(sandCanGoDownLeft(map, sandUnitCoordinates)).to.equal(false);
  });
});

describe('sandCanGoDownRight', () => {
  it('returns true if the sand can go down right', () => {
    const map = new Set();
    const sandUnitCoordinates = { x: 500, y: 0 };
    expect(sandCanGoDownRight(map, sandUnitCoordinates)).to.equal(true);
  });

  it('returns false if the sand can go down right', () => {
    const map = new Set();
    map.add('501,1');
    const sandUnitCoordinates = { x: 500, y: 0 };
    expect(sandCanGoDownRight(map, sandUnitCoordinates)).to.equal(false);
  });
});