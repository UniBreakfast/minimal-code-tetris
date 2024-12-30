export { getRandomOmino }

function getRandomOmino() {
  return ominos.at(Math.random() * ominos.length)
}

const ominos = [
  [
    [0, 1, 0, 0], // ░░██░░░░
    [0, 1, 0, 0], // ░░██░░░░
    [0, 1, 0, 0], // ░░██░░░░
    [0, 1, 0, 0]  // ░░██░░░░
  ],
  [
    [0, 1, 0], // ░░██░░
    [1, 1, 0], // ████░░
    [0, 1, 0]  // ░░██░░
  ],
  [
    [1, 1, 0], // ████░░
    [0, 1, 0], // ░░██░░
    [0, 1, 0]  // ░░██░░
  ],
  [
    [0, 1, 0], // ░░██░░
    [0, 1, 0], // ░░██░░
    [1, 1, 0]  // ████░░
  ],
  [
    [0, 1, 0], // ░░██░░
    [1, 1, 0], // ████░░
    [1, 0, 0]  // ██░░░░
  ],
  [
    [1, 0, 0], // ██░░░░
    [1, 1, 0], // ████░░
    [0, 1, 0]  // ░░██░░
  ],
  [
    [1, 1], // ████
    [1, 1]  // ████
  ]
];
