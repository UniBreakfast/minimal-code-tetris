export { drawFrozen }

import { drawBlock } from './block.js'

function drawFrozen(frozen) {
  frozen.forEach((row, r) => row.forEach((block, c) => {
    if (block) drawBlock(r, c)
  }))
}
