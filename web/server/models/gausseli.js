const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gausseli = new Schema(
    {
        A: { type: [[Number]], required: true },
        B: { type: [Number], required: true },
        n: { type: [Number], required: true }
    }
)

module.exports = mongoose.model('gausselis', gausseli)