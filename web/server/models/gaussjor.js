const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gaussjor = new Schema(
    {
        A: { type: [[Number]], required: true },
        B: { type: [Number], required: true },
        n: { type: [Number], required: true }
    }
)

module.exports = mongoose.model('gaussjors', gaussjor)