const { describe, it } = require('node:test')
const utils = require('./utils')
const assert = require('assert').strict

describe('getPlayScore', () => {
    it('should return 4 if rival plays A and I play Y', () => {
        assert.equal(8, utils.getPlayScore('A', 'Y'))
    })

    it('should return 1 if rival plays B and I play X', () => {
        assert.equal(1, utils.getPlayScore('B', 'X'))
    })

    it('should return 7 if rival plays C and I play Z', () => {
        assert.equal(6, utils.getPlayScore('C', 'Z'))
    })
})

describe('getPlayScoreFollowingStrategy tests', () => {
    it('should return 4 if rival plays A in the first round', () => {
        assert.equal(4, utils.getPlayScoreFollowingStrategy('A', 'Y'))
    })

    it('should return 1 if rival plays B in the second round', () => {
        assert.equal(1, utils.getPlayScoreFollowingStrategy('B', 'X'))
    })

    it('should return 7 if rival plays C in the third round', () => {
        assert.equal(7, utils.getPlayScoreFollowingStrategy('C', 'Z'))
    })
});