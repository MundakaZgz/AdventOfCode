# 🎄 Advent Of Code 🎄

Solutions to the [Advent of Code](https://adventofcode.com) challenges in JavaScript (Node.js).

## Requirements

- [Node.js](https://nodejs.org/) >= 22
- npm dependencies installed with `npm install`
- Optional `.env` file with `AOC_SESSION_COOKIE=your_cookie` if you want to scaffold a missing challenge

> [!WARNING]
> Automatic `input.txt` download is currently disabled in `src/template/challengeSetup.js`

## Getting started

1. Install dependencies with `npm install`
2. Optionally create a `.env` file with `AOC_SESSION_COOKIE=your_cookie`
3. Run `npm start <year> <day>`
4. If the target challenge does not exist, the project creates the folder and copies the template `index.js`

Examples:

- `npm start 2024 1`
- `npm start 2025 1`

## Challenge status per year

| Year | Completed days | Status |
|---|---|---|
| 2022 | 15/25 | 🔄 In progress |
| 2023 | 13/25 | 🔄 In progress |
| 2024 | 11/25 | 🔄 In progress |
| 2025 | 6/25 | 🔄 In progress |

Notes:

- The 2022 total includes `day1` to `day9` in `src/2022` and archived `day10` to `day15` in `src/2022_backup`.
- The 2025 folder currently uses zero-padded names (`day01` to `day06`) and also contains an extra `day6` directory.

## Project structure

```
AdventOfCode/
├── index.js                  # Entry point: node index.js <year> <day>
├── .nvmrc                    # Node.js version used by the project
├── eslint.config.js          # Active ESLint flat config
├── .eslintrc.yml             # Legacy ESLint config kept in the repo
├── src/
│   ├── template/             # Template for new challenges
│   │   ├── template.js       #   Base code for a solution
│   │   └── challengeSetup.js #   Auto-setup + input download script
│   ├── 2022/                 # Active 2022 solutions (day1-day9)
│   ├── 2022_backup/          # Archived 2022 solutions (day10-day15)
│   ├── 2023/ (day1-day13)
│   ├── 2024/ (day1-day11)
│   └── 2025/ (day01-day06)
├── package.json
├── .prettierignore
└── .prettierrc

```

## Commands

| Command | Description |
|---|---|
| `npm start <year> <day>` | Runs `index.js` with the Node inspector enabled; if the challenge folder does not exist, it scaffolds it from the template |
| `npm test` | Runs tests with Mocha (`src/**/*.test.js`) |
| `npm run lint` | Runs ESLint on `src/**/*.js` using `eslint.config.js` |
| `npm run debug` | Runs with the Node.js inspector (`--inspect-brk`) |
| `npm run prettier` | Runs Prettier on `src/**/*.js` |

## Tests

The project uses [Mocha](https://mochajs.org/) + [Chai](https://www.chaijs.com/) for testing.

```bash
npm test
```

Tests should be placed next to the solutions using the `*.test.js` pattern.

## Technologies

- **Runtime:** Node.js 22
- **Language:** JavaScript ES modules
- **Testing:** Mocha + Chai
- **Linting:** ESLint flat config + eslint-config-prettier
- **Formatting:** Prettier
