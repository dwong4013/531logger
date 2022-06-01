const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(require('./middleware/sanitizeBody'))

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/cycles', require('./routes/api/cycles'));
app.use('/api/workouts', require('./routes/api/workouts'))

// Establish db connection
require('./config/db');

const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : process.env.BACKEND_PORT;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
