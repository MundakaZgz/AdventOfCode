const fs = require('fs')

const filePath = './input.txt'
const ROUNDS = 10_000

const readData = () => {
    const data = fs
        .readFileSync(filePath, "utf-8")
        .split(/\r?\n/)

    return data
}

const getLCM = divisors => {
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    let lcm = 1;
  
    for (const divisor of divisors) {
      lcm = (lcm * divisor) / gcd(lcm, divisor);
    }
  
    return lcm;
  }

const main = () => {
    let data = readData()
    let monkeys = []

    prepareMonkeys(data, monkeys)

    for (let round = 0; round < ROUNDS; round++) {
        monkeys.forEach(monkey => {
            monkey.play(monkeys)
        });
    }

}

const prepareMonkeys = (data, monkeys) => {
    let foundItems
    let foundOperation
    let foundDivisibleBy
    let foundMonkeyToIfTrue
    let foundmonkeyToIfFalse
    let id = 0

    data.forEach(line => {
        if (line.startsWith('  Starting items:')) {
            foundItems = line.substring(line.indexOf(':') + 1).split(',').map(x => Number(x))
        }
        if (line.startsWith('  Operation:')) {
            foundOperation = new Function('old', `return ${line.substring(line.indexOf('=') + 1)}`)
        }
        if (line.startsWith('  Test:')) {
            foundDivisibleBy = Number(line.match(/  Test: divisible by (\d+)/)[1])
        }
        if (line.startsWith('    If true:')) {
            foundMonkeyToIfTrue = Number(line.match(/    If true: throw to monkey (\d+)/)[1])
        }
        if (line.startsWith('    If false:')) {
            foundmonkeyToIfFalse = Number(line.match(/    If false: throw to monkey (\d+)/)[1])
            monkeys.push(new Monkey(id, foundItems, foundOperation, foundDivisibleBy, foundMonkeyToIfTrue, foundmonkeyToIfFalse))
            id++
        }
    })

    for (let round = 0; round < ROUNDS; round++) {
        monkeys.map(x => x.play(monkeys))
    }

    times = monkeys.map(x => x.itemsInspected).sort((a,b)=> b-a)

    console.log(`The product of the most inspected is ${times[0] *  times[1]}`)
}

class Monkey {
    constructor(id, list, operation, divisibleBy, monkeyToIFTrue, monkeyToIfFalse) {
        this.id = id
        this.list = list
        this.operation = operation
        this.divisibleBy = divisibleBy
        this.monkeyToIFTrue = monkeyToIFTrue
        this.monkeyToIfFalse = monkeyToIfFalse
        this.itemsInspected = 0
    }

    sendTo = (item) => {
        return item % this.divisibleBy === 0 ? this.monkeyToIFTrue : this.monkeyToIfFalse
    }

    play = (monkeys) => {
        const numberOfItems = this.list.length
        const lcm = getLCM(monkeys.map((x) => x.divisibleBy));
        for (let index = 0; index < numberOfItems; index++) {
            let item = this.list.shift()
            item = this.operation(item)
            item = item % lcm
            monkeys[this.sendTo(item)].list.push(item)
            this.itemsInspected++
        }
    }
}

main()