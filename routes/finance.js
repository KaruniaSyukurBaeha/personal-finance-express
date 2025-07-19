const express = require('express');
const router  = express.Router();
const pool    = require('../db');

// ALL INCOME
router.get('/income', (req, res) => {
  pool.query(
    `SELECT
       t.id, t.entry_type, t.amount, t.category_id, c.name AS category_name,
       t.txn_date, t.description, t.created_at, t.updated_at
     FROM transactions t
     JOIN categories c ON c.id = t.category_id
     WHERE t.entry_type = 'income'
     ORDER BY t.txn_date DESC`,
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
});

// ALL EXPENSE
router.get('/expense', (req, res) => {
  pool.query(
    `SELECT
       t.id, t.entry_type, t.amount, t.category_id, c.name AS category_name,
       t.txn_date, t.description, t.created_at, t.updated_at
     FROM transactions t
     JOIN categories c ON c.id = t.category_id
     WHERE t.entry_type = 'expense'
     ORDER BY t.txn_date DESC`,
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
});

module.exports = router;
