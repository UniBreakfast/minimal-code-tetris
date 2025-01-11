export { drawBlock }

import { rowCount } from '../../config.js'
import { canvas, ctx } from './canvas.js'

function drawBlock(r, c, color) {
  const unit = canvas.height / rowCount

  if (color) ctx.fillStyle = color
  
  ctx.fillRect(c * unit, r * unit, unit, unit)
  ctx.strokeRect(c * unit, r * unit, unit, unit)
}
