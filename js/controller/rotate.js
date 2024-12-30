export { bindTryRotate }

import { doesIntersect, doesCollide } from '../model/checks.js'
import { rotate } from '../model/rotate.js'

function bindTryRotate(getState, setOmino) {

  return function tryRotate() {
    const { frozen, omino, position } = getState()
    const rotatedOmino = rotate(omino)

    if (
      doesIntersect(frozen, rotatedOmino, position) || 
      doesCollide(rotatedOmino, position)
    ) return

    setOmino(rotatedOmino)
  }
}
