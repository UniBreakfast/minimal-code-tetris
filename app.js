import { speed, rowCount, columnCount } from './config.js'

import { getEmptyGrid } from './js/model/grid.js'
import { getRandomOmino } from './js/model/ominos.js'
import { doesIntersect } from './js/model/checks.js'
import { mergeIn } from './js/model/merge.js'
import { removeFullRows } from './js/model/full-rows.js'
import { bindTryMove } from './js/controller/move.js'
import { bindHandleKeys } from './js/controller/keys.js'
import { render } from './js/view/render.js'

const initialPosition = [0, columnCount / 2 - 1] 

let frozen = getEmptyGrid(rowCount, columnCount)
let omino = getRandomOmino()
let position = initialPosition

const setOmino = (newOmino) => omino = newOmino
const setPosition = (newPosition) => position = newPosition
const getState = () => ({frozen, omino, position})
const tryMoveDown = bindTryMove('down', getState, setPosition)
const handleKeys = bindHandleKeys(getState, setOmino, setPosition)

const id = setInterval(tick, 1 / speed * 1000)

window.onkeydown = handleKeys

function tick() {
  if (doesIntersect(frozen, omino, position)) {
    clearInterval(id)
    window.onkeydown = null

  } else if (!tryMoveDown()) {
    mergeIn(frozen, omino, position)

    removeFullRows(frozen)

    omino = getRandomOmino()
    position = initialPosition
  }
  render(frozen, omino, position)
}
