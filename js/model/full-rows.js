export { removeFullRows }

import { rowCount,columnCount } from "../../config.js"
import { getEmptyGrid } from "./grid.js"

function removeFullRows(frozen) {
  const leftovers = frozen.filter(row => !row.every(Boolean))
  const emptyCount = rowCount - leftovers.length
  const newRows = getEmptyGrid(emptyCount, columnCount)
  frozen.splice(0, rowCount, ...newRows, ...leftovers)
}
