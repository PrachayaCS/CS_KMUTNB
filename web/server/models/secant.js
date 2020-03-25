const mongoose = require('mongoose')
const Schema = mongoose.Schema

const secant = new Schema(
    {
        xi1: { type: String, required: true },
        xi: { type: String, required: true },
        fx: { type: String, required: true }
    }
)

module.exports = mongoose.model('secants', secant)