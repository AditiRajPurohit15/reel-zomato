require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');

connectDB();

PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})