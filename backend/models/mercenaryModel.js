const mongoose = require("mongoose");

// constructor for Schema objects
const Schema = mongoose.Schema;

const mercenarySchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    hp: {
      type: Number,
      required: true,
    },
  });

module.exports = mongoose.model('Mercenary', mercenarySchema);