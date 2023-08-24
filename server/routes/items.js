const express = require("express");
const router = express.Router();
const pool = require("../config/db");

//master search
router.get("/:search", async (req, res) => {
  try {
    const search = req.params.search.toLowerCase();
    id = Number(search) ? Number(search) : -1;
    const items = await pool.query(
      "SELECT * FROM items WHERE LOWER(items.name) LIKE $1 OR LOWER(items.category) LIKE $1 OR LOWER(items.description) LIKE $1 OR id = $2",
      ["%" + search + "%", id]
    );
    res.json(items.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//default search
router.get("/", async (req, res) => {
  try {
    const items = await pool.query("SELECT * FROM items");
    res.json(items.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create item
router.post("/", async (req, res) => {
  try {
    const { name, category, description } = req.body;
    const newItem = await pool.query(
      "INSERT INTO items (name, category, description) VALUES($1, $2, $3) RETURNING *",
      [name, category, description]
    );
    res.json(newItem.rows[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete Item
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteItem = await pool.query("DELETE FROM items WHERE id = $1", [
      id,
    ]);
    res.json("Deleted item");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Update Item
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, description } = req.body;
    if (name) {
      await pool.query("UPDATE items SET name=$1 WHERE id = $2", [name, id]);
    }
    if (category) {
      await pool.query("UPDATE items SET category=$1 WHERE id = $2", [
        category,
        id,
      ]);
    }
    if (description) {
      await pool.query("UPDATE items SET description=$1 WHERE id = $2", [
        description,
        id,
      ]);
    }
    res.json("Updated item");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
