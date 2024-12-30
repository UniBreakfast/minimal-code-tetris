const ctx = c.getContext('2d')
const size = (c.width = (c.height = innerHeight) / 2) / 10

const ominos = [
  [
    [1, 1],
    [1, 1]
  ],
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1]
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0]
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0]
  ]
]

const down = [1, 0]
const right = [0, 1]
const left = [0, -1]

const frozen = getEmptyGrid()
let omino = getRandomOmino()
let rotatedOmino
let position = getRandomPosition()
let nextPosition

const id = setInterval(tick, 500)

onkeydown = handleKeys
ctx.fillStyle = '#666'

function tick() {
  if (doesIntersect()) {
    clearInterval(id)
    onkeydown = null
  } else if (nextPosition = canMove(down)) {
    position = nextPosition
  } else {
    freeze()
    removeFullRows()
    omino = getRandomOmino()
    position = getRandomPosition()
  }

  render()
}

function render() {
  ctx.clearRect(0, 0, c.width, c.height)
  drawFrozen()
  drawOmino()
}

function drawOmino() {
  const [r, c] = position
  omino.forEach((row, i) => row.forEach((block, j) => {
    if (block) drawBlock(r + i, c + j)
  }))
}

function drawBlock(r, c) {
  ctx.fillRect(c * size, r * size, size, size)
  ctx.strokeRect(c * size, r * size, size, size)
}

function drawFrozen() {
  frozen.forEach((row, r) => row.forEach((block, c) => {
    if (block) drawBlock(r, c)
  }))
}

function freeze() {
  const [r, c] = position
  omino.forEach((row, i) => row.forEach((block, j) => {
    if (block) frozen[r + i][c + j] = 1
  }))
}

function getRandomOmino() {
  return ominos.at(Math.random() * ominos.length)
}

function getRandomPosition() {
  const r = 0
  const c = Math.floor(Math.random() * (10 - omino.length))

  return [r, c]
}

function getEmptyGrid(depth = 20) {
  return Array(depth).fill(0).map(() => Array(10).fill(0))
}

function doesIntersect([r, c] = position) {
  return omino.some((row, i) => row.some((block, j) => {
    return block && frozen[r + i]?.[c + j]
  }))
}

function removeFullRows() {
  const leftovers = frozen.filter(row => !row.every(Boolean))
  const newRows = getEmptyGrid(20 - leftovers.length)

  frozen.splice(0, 20, ...newRows, ...leftovers)
}

function canMove(direction) {
  nextPosition = move(direction)
  return !doesIntersect(nextPosition) &&
    !doesCollide(nextPosition) && nextPosition
}

function doesCollide([r, c] = position) {
  return omino.some((row, i) => row.some((block, j) => {
    return block && (r + i >= 20 || c + j < 0 || c + j >= 10)
  }))
}

function move([dr, dc]) {
  const [r, c] = position
  return [r + dr, c + dc]
}

function canRotate() {
  const [r, c] = position
  const unrotatedOmino = omino
  const rotatedOmino = rotate(omino)

  omino = rotatedOmino

  const result = !doesIntersect() && !doesCollide()

  omino = unrotatedOmino

  return result && rotatedOmino
}

function rotate(omino) {
  return omino.map((row, i) => row.map((_, j) => {
    return omino[omino.length - 1 - j][i]
  }))
}

function handleKeys(e) {
  if (e.key === 'ArrowRight') {
    if (nextPosition = canMove(right)) position = nextPosition
  } else if (e.key === 'ArrowLeft') {
    if (nextPosition = canMove(left)) position = nextPosition
  } else if (e.key === 'ArrowDown') {
    if (nextPosition = canMove(down)) position = nextPosition
  } else if (e.key === 'ArrowUp') {
    if (rotatedOmino = canRotate()) omino = rotatedOmino
  } else {
    return
  }

  render()
}
