export { getEmptyGrid }

function getEmptyGrid(rows, columns) {
  return Array(rows).fill(0).map(() => Array(columns).fill(0))
}
