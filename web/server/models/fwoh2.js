const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fwoh2 = new Schema(
    {
        fx: { type: String, required: true },
        d: { type: String, required: true },
        h: { type: String, required: true },
        x: { type: String, required: true }
    }
)

module.exports = mongoose.model('fwoh2s', fwoh2)