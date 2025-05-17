const express = require('express');
const router  = express.Router();
const pool    = require('../db');

// CREATE
router.post('/', (req, res) => {
  const { name, type, description } = req.body;
  pool.query(
    'INSERT INTO categories (name,type,description) VALUES (?,?,?)',
    [name, type, description],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: 'Category created', id: result.insertId });
    }
  );
});

// READ ALL
router.get('/', (req, res) => {
  pool.query('SELECT * FROM categories', (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// READ ONE
router.get('/:id', (req, res) => {
  pool.query('SELECT * FROM categories WHERE id = ?', [req.params.id], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows[0] || {});
  });
});

// UPDATE
router.put('/:id', (req, res) => {
  const { name, type, description } = req.body;
  pool.query(
    'UPDATE categories SET name=?, type=?, description=? WHERE id=?',
    [name, type, description, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Category updated' });
    }
  );
});

// DELETE
router.delete('/:id', (req, res) => {
  pool.query('DELETE FROM categories WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Category deleted' });
  });
});

module.exports = router;
