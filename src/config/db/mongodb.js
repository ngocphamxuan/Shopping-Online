const mongose = require('mongoose')

const mongodbConnect = async () => {
    try {
        console.log(process.env.MONGODB_URI)
        await mongose.connect(process.env.MONGODB_URI)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(`Cant connect to MongoDB, Error: ${error}`)
    }
}
module.exports = mongodbConnect

