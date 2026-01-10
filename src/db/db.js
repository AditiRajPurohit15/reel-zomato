const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://aditi:YOUR_PASSWORD@reel-zomato.qnimwlt.mongodb.net/reelZomato");
        console.log('mongoDB connected');
    } catch (error) {
        console.error('mongoDB connection failed ', error.message);
    }
}

module.exports = connectDB;