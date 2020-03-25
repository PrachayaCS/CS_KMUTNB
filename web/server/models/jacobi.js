const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jacobi = new Schema(
    {
        A: { type: [[Number]], required: true },
        B: { type: [Number], required: true },
        n: { type: [Number], required: true }
    }
)

module.exports = mongoose.model('jacobis', jacobi)