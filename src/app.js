const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const meRoute = require('./routes/me.routes');

const app = express();
app.use(cors({
  origin: "https://reel-zomato-client-7i7g.vercel.app",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/food',foodRoutes);
app.use('/api/profile',meRoute);


module.exports = app;