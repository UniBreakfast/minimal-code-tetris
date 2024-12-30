export { rotate }

function rotate(omino) {
  return omino.map((_, j) => omino.map(row => row[j]).reverse())
}
