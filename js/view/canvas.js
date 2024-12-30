export { canvas, ctx }

import { rowCount, columnCount } from "../../config.js"

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const unit = (window.innerHeight - 1) / rowCount

canvas.height = unit * rowCount
canvas.width = unit * columnCount

ctx.fillStyle = '#555'
