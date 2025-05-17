const express = require('express');
const router  = express.Router();
const pool    = require('../db');

// CREATE
router.post('/', (req, res) => {
  const { entry_type, amount, category_id, txn_date, description } = req.body;
  pool.query(
    'INSERT INTO transactions (entry_type,amount,category_id,txn_date,description) VALUES (?,?,?,?,?)',
    [entry_type, amount, category_id, txn_date, description],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: 'Transaction created', id: result.insertId });
    }
  );
});

// READ ALL
router.get('/', (req, res) => {
  pool.query('SELECT * FROM transactions', (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// READ ONE
router.get('/:id', (req, res) => {
  pool.query('SELECT * FROM transactions WHERE id=?', [req.params.id], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows[0] || {});
  });
});

// UPDATE
router.put('/:id', (req, res) => {
  const { entry_type, amount, category_id, txn_date, description } = req.body;
  pool.query(
    'UPDATE transactions SET entry_type=?,amount=?,category_id=?,txn_date=?,description=? WHERE id=?',
    [entry_type, amount, category_id, txn_date, description, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Transaction updated' });
    }
  );
});

// DELETE
router.delete('/:id', (req, res) => {
  pool.query('DELETE FROM transactions WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Transaction deleted' });
  });
});

module.exports = router;