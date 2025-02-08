const mongoose  = require('mongoose');

const connectDatabase = async(DATABASE_URL,DATABASE_NAME) =>{
    try {
        await mongoose.connect(DATABASE_URL, {
               dbName : DATABASE_NAME,
        });
        console.log('Database connected successfully to ' + DATABASE_NAME);
    } catch (error) {
        console.log(error);
        console.log('Database connection failed');
    }
}

module.exports = connectDatabase 