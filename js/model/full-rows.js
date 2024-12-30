export { removeFullRows }

import { rowCount,columnCount } from "../../config.js"
import { getEmptyGrid } from "./grid.js"

function removeFullRows(frozen) {
  const leftovers = frozen.filter(row => !row.every(Boolean))
  const newRows = getEmptyGrid(20 - leftovers.length, columnCount)
  frozen.splice(0, rowCount, ...newRows, ...leftovers)
}
