const express = require('express');
const router  = express.Router();
const pool    = require('../db');

// ALL INCOME
router.get('/income', (req, res) => {
  pool.query('SELECT * FROM income', (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// ALL EXPENSE
router.get('/expense', (req, res) => {
  pool.query('SELECT * FROM expense', (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

module.exports = router;
