export { mergeIn }

function mergeIn(frozen, omino, position) {
  const [r, c] = position

  omino.forEach((row, i) => row.forEach((block, j) => {
    if (block) frozen[r + i][c + j] = block
  }))
}
