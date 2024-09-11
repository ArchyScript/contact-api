const mongoose = require('mongoose')

const connectDatabase = async () => {
    let mongodbConnectionString = process.env.mongodbConnectionString || ''
    mongoose.connect(mongodbConnectionString)
        .then((event) => console.log('MongoDB Connected', event.connection.host))
        .catch(err => console.log('MongoDB Connection Error:', err));
}

module.exports = { connectDatabase }