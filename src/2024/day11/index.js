const fs = require('fs')
const { interfaces } = require('mocha')
const path = require('path')

async function run() {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim()
  await resolveFirstChallenge(input)
  await resolveSecondChallenge(input)
}

function blink(currentValue) {
  if (currentValue === '0') return '1'
  if (currentValue.length % 2 === 0) return String(parseInt(currentValue.substring(0, currentValue.length / 2))) + ' ' + String(parseInt(currentValue.substring(currentValue.length / 2)))
  return String(parseInt(currentValue) * 2024)
}

function resolveFirstChallenge(input) {
  let stones = input.split(' ')
  let result = ''
  console.log('Initial arrangement: ' + stones)
  for (let times = 0; times < 25; times++) {
    result = ''
    for (let i = 0; i < stones.length; i++) {
      result += blink(stones[i]) + ' '
    }
    // console.log('After ' + (times + 1) + ' blinks: ' + result.trim())
    stones = result.trim().split(' ')
  }

  console.log('Result first challenge:', stones.length)
}

function resolveSecondChallenge(input) {

}

run()