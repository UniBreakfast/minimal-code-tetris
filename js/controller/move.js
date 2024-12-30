export { bindTryMove }

import { doesIntersect, doesCollide } from '../model/checks.js'

function bindTryMove(direction, getState, setPosition) {

  return function tryMove() {
    const { frozen, omino, position } = getState()
    const [dr, dc] = moves[direction]
    const [r, c] = position
    const expectedPosition = [r + dr, c + dc]

    if (
      doesIntersect(omino, frozen, expectedPosition) || 
      doesCollide(omino, expectedPosition)
    ) return false
    
    setPosition(expectedPosition)
    return true
  } 
}

const down = [1, 0]
const left = [0, -1]
const right = [0, 1]
const moves = { down, left, right }
