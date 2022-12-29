const fs = require("fs")

const filePath = "./input.txt"

const readData = () => {
    const data = fs
        .readFileSync(filePath, "utf-8")
        .split(/\r?\n/)
        .map(row => row.split(" "))

    return data
}

const getPixel = (cycle, X) => {
    let column = (cycle - 1) % COLS

    if ([X - 1, X, X + 1].includes(column)) {
        return '#'
    } else {
        return '.'
    }
}

const updateScreen = (screen, X, cycle) => {
    const row = parseInt((cycle - 1) / COLS);
    const col = (cycle - 1) % COLS;

    screen[row][col] = getPixel(cycle, X)
}

const COLS = 40
const ROWS = 6

const main = () => {

    let operations = readData()
    let X = 1
    let total = 0
    let cycle = 1
    let screen = new Array(ROWS).fill(".").map(row => new Array(COLS).fill(" "));

    for (const [operation, argument] of operations) {
        if (operation == 'noop') {
            updateScreen(screen, X, cycle)
            cycle++
        } else {
            for (let loop = 0; loop < 2; loop++) {
                updateScreen(screen, X, cycle)
                cycle++
            }
            X += Number(argument)
        }
    }

    console.log(`The screen is`)
    screen.forEach(row => console.log(row.join("")));

}

main()

