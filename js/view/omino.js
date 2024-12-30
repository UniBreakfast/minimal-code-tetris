export { drawOmino }

import { drawBlock } from './block.js'

function drawOmino(omino, position) {
  const [r, c] = position

  omino.forEach((row, i) => row.forEach((block, j) => {
    if (block) drawBlock(r + i, c + j)
  }))
}
