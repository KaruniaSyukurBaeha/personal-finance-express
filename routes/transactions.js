const express = require('express');
const router  = express.Router();
const pool    = require('../db');

// CREATE
router.post('/', (req, res) => {
  const { entry_type, amount, category_id, txn_date, description } = req.body;
  pool.query(
    'INSERT INTO transactions (entry_type, amount, category_id, txn_date, description) VALUES (?, ?, ?, ?, ?)',
    [entry_type, amount, category_id, txn_date, description],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'DB insert error', error: err });
      const newId = result.insertId;

      // Ambil record lengkap dengan JOIN
      pool.query(
        `SELECT 
           t.id, t.entry_type, t.amount, t.category_id, c.name AS category_name, 
           t.txn_date, t.description, t.created_at, t.updated_at
         FROM transactions t
         JOIN categories c ON c.id = t.category_id
         WHERE t.id = ?`,
        [newId],
        (err2, rows) => {
          if (err2) return res.status(500).json({ message: 'DB fetch error', error: err2 });
          if (!rows.length) return res.status(404).json({ message: 'Transaction not found' });

          res.status(201).json({
            message: 'Transaksi berhasil dibuat',
            data: rows[0]
          });
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
      if (err) return res.status(500).json({ message: 'DB fetch error', error: err });
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
      if (err) return res.status(500).json({ message: 'DB fetch error', error: err });
      if (!rows.length) return res.status(404).json({ message: 'Transaction not found' });
      res.json(rows[0]);
    }
  );
});

// UPDATE
router.put('/:id', (req, res) => {
  const { entry_type, amount, category_id, txn_date, description } = req.body;
  pool.query(
    'UPDATE transactions SET entry_type=?, amount=?, category_id=?, txn_date=?, description=? WHERE id=?',
    [entry_type, amount, category_id, txn_date, description, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ message: 'DB update error', error: err });

      // Ambil kembali record terbaru
      pool.query(
        `SELECT 
           t.id, t.entry_type, t.amount, t.category_id, c.name AS category_name, 
           t.txn_date, t.description, t.created_at, t.updated_at
         FROM transactions t
         JOIN categories c ON c.id = t.category_id
         WHERE t.id = ?`,
        [req.params.id],
        (err2, rows) => {
          if (err2) return res.status(500).json({ message: 'DB fetch error', error: err2 });
          if (!rows.length) return res.status(404).json({ message: 'Transaction not found' });

          res.json({
            message: 'Transaksi berhasil diperbarui',
            data: rows[0]
          });
        }
      );
    }
  );
});

// DELETE
router.delete('/:id', (req, res) => {
  pool.query('DELETE FROM transactions WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'DB delete error', error: err });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: 'Transaksi berhasil dihapus' });
  });
});

module.exports = router;