# 🎄 Advent Of Code 🎄

Soluciones a los desafíos de [Advent of Code](https://adventofcode.com) en JavaScript (Node.js).

## Requisitos

- [Node.js](https://nodejs.org/) >= 18
- Variable de entorno `AOC_SESSION_COOKIE` con la cookie de sesión de [adventofcode.com](https://adventofcode.com) (necesaria para descargar inputs automáticamente)

## Getting started

1. Decide si quieres programar en local o en dev container
2. Asigna tu session cookie de AOC: `export AOC_SESSION_COOKIE=tu_cookie`
3. Ejecuta `npm start <año> <día>`. Si la solución existe, se ejecuta; si no, se prepara el código base y se descarga el `input.txt`

## Challenge status per year

| Año | Días completados | Estado |
|---|---|---|
| 2022 | 25/25 | ✅ Completado |
| 2023 | 13/25 | 🔄 En progreso |
| 2024 | 11/25 | 🔄 En progreso |
| 2025 | 0/25 | ⏳ Pendiente |

## Estructura del proyecto

```
AdventOfCode/
├── index.js                  # Entry point: node index.js <año> <día>
├── src/
│   ├── template/             # Template para nuevos desafíos
│   │   ├── template.js       #   Código base de una solución
│   │   └── challengeSetup.js #   Script de auto-setup + descarga de input
│   ├── 2022/
│   │   ├── index.js
│   │   ├── day1/
│   │   │   ├── index.js      #   Orchestrador (require partOne + partTwo)
│   │   │   ├── partOne.js    #   Solución parte 1
│   │   │   ├── partTwo.js    #   Solución parte 2
│   │   │   ├── input.txt     #   Input del desafío
│   │   │   └── README.md     #   Enunciado del desafío
│   │   └── day2/ ... day25/
│   ├── 2023/ (day1-day13)
│   └── 2024/ (day1-day11)
├── .devcontainer/            # Configuración para dev container (VS Code)
├── package.json
└── .eslintrc.yml
```

## Comandos

| Comando | Descripción |
|---|---|---|
| `npm start <año> <día>` | Ejecuta la solución o configura el template si no existe |
| `npm test` | Ejecuta los tests con Mocha (`src/**/*.test.js`) |
| `npm run lint` | Analiza el código con ESLint |
| `npm run debug` | Ejecuta con inspector de Node.js (`--inspect-brk`) |

## Formato de las soluciones

Existen dos patrones en el repositorio:

- **Patrón 2022** — `index.js` orquestra la ejecución de `partOne.js` y `partTwo.js` por separado.
- **Patrón template/2024** — Un único `index.js` que resuelve ambas partes secuencialmente.

Ambos son compatibles con el entry point `index.js` raíz.

## Tests

El proyecto usa [Mocha](https://mochajs.org/) + [Chai](https://www.chaijs.com/) para testing.

```bash
npm test
```

Los tests deben ubicarse junto a las soluciones con el patrón `*.test.js`.

## Dev container

El repositorio incluye configuración para [Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers) de VS Code, lo que permite un entorno de desarrollo reproducible sin instalar dependencias localmente.

## Tecnologías

- **Runtime:** Node.js
- **Testing:** Mocha + Chai
- **Linting:** ESLint (configuración airbnb-base)
