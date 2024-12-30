export { render }

import { canvas, ctx } from './canvas.js'
import { drawFrozen } from './frozen.js'
import { drawOmino } from './omino.js'

function render(frozen, omino, position) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  drawFrozen(frozen)
  drawOmino(omino, position)
}
