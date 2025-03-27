require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

app.use(express.json());
app.use(cors());

app.use('/api', authRoutes);
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to my User Registration and Login API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
