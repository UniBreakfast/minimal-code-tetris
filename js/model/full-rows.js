export { removeFullRows }

import { rowCount } from "../../config.js"
import { getEmptyGrid } from "./grid.js"

function removeFullRows(frozen) {
  const leftovers = frozen.filter(row => !row.every(Boolean))
  const newRows = getEmptyGrid(20 - leftovers.length)
  frozen.splice(0, rowCount, ...newRows, ...leftovers)
}
