const express = require("express");
const router = express.Router();
const Item = require("../models/item");

//default search
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//master search
router.get("/:search", async (req, res) => {
  try {
    if (req.params.search.match(/^[0-9a-fA-F]{24}$/)) {
      items = await Item.findById(req.params.search);
    } else if (req.params.search != "None") {
      items = await Item.find({
        $or: [
          { name: new RegExp(req.params.search, "i") },
          { description: new RegExp(req.params.search, "i") },
        ],
      })
        .limit(10)
        .skip((req.params.page - 1) * 10);
    }
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Creating one
router.post("/", async (req, res) => {
  const item = new Item({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
  });
  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
router.patch("/:id", getItem, async (req, res) => {
  if (req.body.name != null) {
    res.item.name = req.body.name;
  }
  if (req.body.description != null) {
    res.item.description = req.body.description;
  }
  if (req.body.category != null) {
    res.item.category = req.body.category;
  }
  try {
    const updatedItem = await res.item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete("/:id", getItem, async (req, res) => {
  try {
    await res.item.deleteOne();
    res.json({ message: "Deleted item" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getItem(req, res, next) {
  let item;
  try {
    item = await Item.findById(req.params.id);
    if (item == null) {
      return res.status(404).json({ message: "Cannot find item" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.item = item;
  next();
}

module.exports = router;
