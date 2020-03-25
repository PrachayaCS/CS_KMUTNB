const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newtonraphson = new Schema(
    {
        x: { type: String, required: true },
        fx: { type: String, required: true }
    }
)

module.exports = mongoose.model('newtonraphsons', newtonraphson)