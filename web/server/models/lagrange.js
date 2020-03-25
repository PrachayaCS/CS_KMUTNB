const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lagrange = new Schema(
    {
        x: { type: [Number], required: true },
        y: { type: [Number], required: true },
        n: { type: [Number], required: true }
    }
)

module.exports = mongoose.model('lagranges', lagrange)