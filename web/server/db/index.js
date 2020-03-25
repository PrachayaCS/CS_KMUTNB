const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://admin:9964fc1f@cluster0-gricl.mongodb.net/Numer', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db