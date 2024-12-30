export { bindHandleKeys }

import { bindTryMove } from "./move.js"
import { bindTryRotate } from "./rotate.js"
import { render } from "../view/render.js"

function bindHandleKeys(getState, setOmino, setPosition) {
  const tryMoveLeft = bindTryMove('left', getState, setPosition)
  const tryMoveRight = bindTryMove('right', getState, setPosition)
  const tryMoveDown = bindTryMove('down', getState, setPosition)
  const tryRotate = bindTryRotate(getState, setOmino)

  return function handleKeys(event) {
    const { key } = event

    if (key === 'ArrowRight') tryMoveRight()
    else if (key === 'ArrowLeft') tryMoveLeft()
    else if (key === 'ArrowDown') tryMoveDown()
    else if (key === 'ArrowUp') tryRotate()
    else return

    const {frozen, omino, position} = getState()

    render(frozen, omino, position)
  }
}
