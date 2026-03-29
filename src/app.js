const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const meRoute = require('./routes/me.routes');

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://reel-zomato-client.vercel.app",
  "https://reel-zomato-client-7i7g.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/food',foodRoutes);
app.use('/api/profile',meRoute);


module.exports = app;