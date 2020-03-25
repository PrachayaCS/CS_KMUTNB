const mongoose = require('mongoose')
const Schema = mongoose.Schema

const onepoint = new Schema(
    {
        x: { type: String, required: true },
        fx: { type: String, required: true }
    }
)

module.exports = mongoose.model('onepoints', onepoint)