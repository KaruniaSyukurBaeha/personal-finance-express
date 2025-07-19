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
      const newId = result.insertId;
      // Setelah insert, ambil kembali record lengkap dengan JOIN
      pool.query(
        `SELECT 
           t.id, t.entry_type, t.amount, t.category_id, c.name AS category_name, 
           t.txn_date, t.description, t.created_at, t.updated_at
         FROM transactions t
         JOIN categories c ON c.id = t.category_id
         WHERE t.id = ?`,
        [newId],
        (err2, rows) => {
          if (err2) return res.status(500).json(err2);
          res.status(201).json(rows[0]);
        }
      );
    }
  );
});

// READ ALL (embed category_name)
router.get('/', (req, res) => {
  pool.query(
    `SELECT 
       t.id, t.entry_type, t.amount, t.category_id, c.name AS category_name, 
       t.txn_date, t.description, t.created_at, t.updated_at
     FROM transactions t
     JOIN categories c ON c.id = t.category_id
     ORDER BY t.txn_date DESC`,
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
});

// READ ONE
router.get('/:id', (req, res) => {
  pool.query(
    `SELECT 
       t.id, t.entry_type, t.amount, t.category_id, c.name AS category_name, 
       t.txn_date, t.description, t.created_at, t.updated_at
     FROM transactions t
     JOIN categories c ON c.id = t.category_id
     WHERE t.id = ?`,
    [req.params.id],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows[0] || {});
    }
  );
});

// UPDATE
router.put('/:id', (req, res) => {
  const { entry_type, amount, category_id, txn_date, description } = req.body;
  pool.query(
    'UPDATE transactions SET entry_type=?,amount=?,category_id=?,txn_date=?,description=? WHERE id=?',
    [entry_type, amount, category_id, txn_date, description, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      // Setelah update, return object terbaru dengan JOIN
      pool.query(
        `SELECT 
           t.id, t.entry_type, t.amount, t.category_id, c.name AS category_name, 
           t.txn_date, t.description, t.created_at, t.updated_at
         FROM transactions t
         JOIN categories c ON c.id = t.category_id
         WHERE t.id = ?`,
        [req.params.id],
        (err2, rows) => {
          if (err2) return res.status(500).json(err2);
          res.json(rows[0]);
        }
      );
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