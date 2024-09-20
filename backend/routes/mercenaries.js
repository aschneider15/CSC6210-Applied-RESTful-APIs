const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Mercenary = require("../models/mercenaryModel");

// Get all mercs
router.get("/", async (req, res) => {
  const mercenary = await Mercenary.find();
  res.status(200).json(mercenary);
});

// POST a single merc
router.post("/", async (req, res) => {
  const { name, type, hp } = req.body;
  try {
    const mercenary = await Mercenary.create({ name, type, hp });
    res.status(200).json(mercenary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  // GET a single mercenary
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Mercenary does not exist." });
    }
    const mercenary = await Mercenary.findById(id);
    if (!mercenary) {
      return res.status(404).json({ error: "Mercenary does not exist." });
    }
    res.status(200).json(mercenary);
  });

  // PATCH a single mercenary's information
  router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Mercenary does not exist." });
    }
    const mercenary = await Mercenary.findOneAndUpdate({ _id: id }, { ...req.body });
    if (!mercenary) {
      return res.status(404).json({ error: "Mercenary does not exist." });
    }
    res.status(200).json(mercenary);
  });

  // DELETE a single mercenary
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Mercenary does not exist." });
    }
    const mercenary = await Mercenary.findOneAndDelete({ _id: id });
    if (!mercenary) {
      return res.status(404).json({ error: "Mercenary does not exist." });
    }
    res.status(200).json(mercenary);
  });
});

module.exports = router;
