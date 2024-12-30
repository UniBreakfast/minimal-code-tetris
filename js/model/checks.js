export { doesIntersect, doesCollide }

import { rowCount, columnCount } from "../../config.js"

function doesIntersect(omino, frozen, position) {
  const [r, c] = position
  
  return omino.some((row, i) => row.some((block, j) => {
    return block && frozen[r + i]?.[c + j]
  }))
}

function doesCollide(omino, position) {
  const [r, c] = position

  return omino.some((row, i) => row.some((block, j) => {
    return block && (
      r + i >= rowCount || 
      c + j < 0 || 
      c + j >= columnCount
    )
  }))
}
