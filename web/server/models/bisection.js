const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bisection = new Schema(
    {
        xl: { type: String, required: true },
        xr: { type: String, required: true },
        fx: { type: String, required: true }
    }
)

module.exports = mongoose.model('bisections', bisection)