export { drawOmino }

import { drawBlock } from './block.js'
import { colors } from '../model/ominos.js'

function drawOmino(omino, position) {
  const [r, c] = position

  omino.forEach((row, i) => row.forEach((block, j) => {
    const color = block ? colors[block] : null

    if (block) drawBlock(r + i, c + j, color)
  }))
}
