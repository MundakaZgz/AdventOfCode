const fs = require("fs")

const filePath = "./input.txt"
const ROPE_LENGTH = 10

const readData = () => {
    const data = fs
        .readFileSync(filePath, "utf-8")
        .split(/\r?\n/)
        .map(row => row.split(" "))

    return data
}

const directionDelta = {
    U: { x: 0, y: -1 },
    D: { x: 0, y: 1 },
    L: { x: -1, y: 0 },
    R: { x: 1, y: 0 },
}

const rope = Array.from({ length: ROPE_LENGTH }, _ => ({ x: 0, y: 0 }))


const main = () => {

    let visitedPositions = new Set()

    let movements = readData()

    for (const [direction, numberOfSteps] of movements) {
        let stepsLeft = +numberOfSteps
        const [head, tail] = [rope[0], rope.slice(-1)[0]]

        while (stepsLeft--) {
            head.x += directionDelta[direction].x
            head.y += directionDelta[direction].y

            for (let i = 1; i < rope.length; i++) {
                const [prev, curr] = [rope[i - 1], rope[i]]
                const delta = {
                    x: prev.x - curr.x,
                    y: prev.y - curr.y,
                }

                if (Math.abs(delta.x) >= 2 || Math.abs(delta.y) >= 2) {
                    delta.x = delta.x === 0 ? 0 : delta.x > 0 ? 1 : -1
                    delta.y = delta.y === 0 ? 0 : delta.y > 0 ? 1 : -1

                    curr.x += delta.x
                    curr.y += delta.y
                }
            }

            visitedPositions.add(`${tail.x} ${tail.y}`)
        }
    }

    console.log(`The number of steps visited by the tail is ${visitedPositions.size}`)
}

main()

