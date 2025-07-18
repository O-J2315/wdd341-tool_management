require('dotenv').config();
const express = require('express');
const { connectDb } = require('./database/connect');

const app = express();
app.use(express.json());

// Import and use centralized routes
app.use('/', require('./routes'));

connectDb(() => {
  app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
});