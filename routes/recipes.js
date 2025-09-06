const express = require('express');
const router = express.Router();
const db = require('../db');

// READ all recipes
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM recipes');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// CREATE new recipe
router.post('/', async (req, res) => {
  const { en, hi } = req.body;
  if (!en || !hi) return res.status(400).json({ error: 'Both English and Hindi required' });

  try {
    await db.query('INSERT INTO recipes (en, hi) VALUES (?, ?)', [en, hi]);
    res.json({ message: 'Recipe added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add recipe' });
  }
});

// UPDATE a recipe
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { en, hi } = req.body;
  try {
    const [result] = await db.query('UPDATE recipes SET en = ?, hi = ? WHERE id = ?', [en, hi, id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Recipe not found' });
    res.json({ message: 'Recipe updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update recipe' });
  }
});

// DELETE a recipe
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM recipes WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Recipe not found' });
    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
});

module.exports = router;
