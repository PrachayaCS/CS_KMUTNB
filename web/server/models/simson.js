const mongoose = require('mongoose')
const Schema = mongoose.Schema

const simson = new Schema(
    {
        fx: { type: String, required: true },
        a: { type: String, required: true },
        b: { type: String, required: true },
        n: { type: String, required: true }
    }
)

module.exports = mongoose.model('simsons', simson)