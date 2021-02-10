const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/subcentro';

const connectDB = async () => {
    try {
        const db = await mongoose.connect(MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false
        });
        console.log('Database is connected to ', db.connection.name);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}//solo hice esto para hacer un nuevo commit

module.exports = connectDB;