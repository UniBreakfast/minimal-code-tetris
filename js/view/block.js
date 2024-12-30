export { drawBlock }

import { rowCount } from '../../config.js'
import { canvas, ctx } from './canvas.js'

function drawBlock(r, c) {
  const unit = canvas.height / rowCount

  ctx.fillRect(c * unit, r * unit, unit, unit)
  ctx.strokeRect(c * unit, r * unit, unit, unit)
}
