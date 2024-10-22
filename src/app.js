const express = require('express');
const bodyParser = require('body-parser');
const transactionsRoutes = require('./routes/transactions');
const summaryRoutes = require('./routes/summary');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/transactions', transactionsRoutes);
app.use('/summary', summaryRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
