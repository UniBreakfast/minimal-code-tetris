const ctx = c.getContext('2d')
const size = (c.width = (c.height = innerHeight) / 2) / 10
const ominos = [
  [ [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0]], [ [0,1,0],
                  [1,1,1],
                  [0,0,0]], [ [0, 1, 0],
                              [0, 1, 0],
                              [0, 1, 1]],
  [ [0,1,0],
    [0,1,0],
    [1,1,0]], [ [1,1,0],
                [0,1,1],
                [0,0,0]], [ [0,1,1],
                            [1,1,0],
                            [0,0,0]], [ [1,1],
                                        [1,1]] ]
const down = [1, 0]
const right = [0, 1]
const left = [0, -1]
let frozen = getEmptyGrid()
let omino = getRandomOmino()
let position = getRandomPosition()
const id = setInterval(tick, 500)

onkeydown = handleKeys
ctx.fillStyle = '#555'

function getEmptyGrid(depth = 20) {
  return Array(depth).fill(0).map(() => Array(10).fill(0))
}

function getRandomOmino() {
  return ominos.at(Math.random() * ominos.length)
}

function getRandomPosition() {
  const r = 0
  const c = Math.floor(Math.random() * (10 - omino.length))
  return [r, c]
}

function tick() {
  if (doesIntersect()) {
    clearInterval(id)
    onkeydown = null
  } else if (!tryMove(down)) {
    freeze()
    removeFullRows()
    omino = getRandomOmino()
    position = getRandomPosition()
  }
  render()
}

function handleKeys(e) {
  if (e.key === 'ArrowRight') tryMove(right)
  else if (e.key === 'ArrowLeft') tryMove(left)
  else if (e.key === 'ArrowDown') tryMove(down)
  else if (e.key === 'ArrowUp') tryRotate()
  render()
}

function doesIntersect([r, c] = position) {
  return omino.some((row, i) => row.some((block, j) => {
    return block && frozen[r + i]?.[c + j]
  }))
}

function doesCollide([r, c] = position) {
  return omino.some((row, i) => row.some((block, j) => {
    return block && (r + i >= 20 || c + j < 0 || c + j >= 10)
  }))
}

function rotate() {
  return omino.map((_, j) => omino.map(row => row[j]).reverse())
}

function tryRotate(backup = omino) {
  omino = rotate()
  if (doesIntersect() || doesCollide()) omino = backup
}

function tryMove([dr, dc], [r, c] = position, backup = position) {
  position = [r + dr, c + dc]
  if (doesIntersect() || doesCollide()) position = backup
  else return true
}

function freeze([r, c] = position) {
  omino.forEach((row, i) => row.forEach((block, j) => {
    if (block) frozen[r + i][c + j] = 1
  }))
}

function removeFullRows() {
  const leftovers = frozen.filter(row => !row.every(Boolean))
  const newRows = getEmptyGrid(20 - leftovers.length)
  frozen = [...newRows, ...leftovers]
}

function drawBlock(r, c) {
  ctx.fillRect(c * size, r * size, size, size)
  ctx.strokeRect(c * size, r * size, size, size)
}

function drawOmino([r, c] = position) {
  omino.forEach((row, i) => row.forEach((block, j) => {
    if (block) drawBlock(r + i, c + j)
  }))
}

function drawFrozen() {
  frozen.forEach((row, r) => row.forEach((block, c) => {
    if (block) drawBlock(r, c)
  }))
}

function render() {
  ctx.clearRect(0, 0, c.width, c.height)
  drawFrozen()
  drawOmino()
}
