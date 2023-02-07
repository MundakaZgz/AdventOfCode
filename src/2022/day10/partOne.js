const fs = require("fs")

const filePath = "./input.txt"

const readData = () => {
    const data = fs
        .readFileSync(filePath, "utf-8")
        .split(/\r?\n/)
        .map(row => row.split(" "))

    return data
}

const main = () => {

    let operations = readData()
    let X = 1
    let total = 0
    let cycle = 1

    for (const [operation, argument] of operations) {
        if (cycle % 40 == 20) {
            total += cycle * X;
        }
        cycle += 1;

        if (operation == 'addx') {
            if (cycle % 40 == 20) {
                total += cycle * X;
            }
            X += Number(argument);
            cycle += 1;
        }
    }

    console.log(`The sum of the signals is ${total}`)

}

main()

