export { drawFrozen }

import { drawBlock } from './block.js'
import { colors } from '../model/ominos.js'

function drawFrozen(frozen) {
  frozen.forEach((row, r) => row.forEach((block, c) => {
    const color = block ? colors[block] : null
    
    if (block) drawBlock(r, c, color)
  }))
}
