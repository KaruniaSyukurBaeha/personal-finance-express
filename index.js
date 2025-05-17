const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();
const port       = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// import routers
const categoriesRouter   = require('./routes/categories');
const transactionsRouter = require('./routes/transactions');
const financeRouter      = require('./routes/finance');

// Routers
app.use('/api/categories',   categoriesRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api',              financeRouter);

// fallback 404
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint tidak ditemukan' });
});

//Listen on environtment port or 5000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});