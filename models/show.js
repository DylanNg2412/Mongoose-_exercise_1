const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const showSchema = new Schema({
  title: { type: String, require: true },
  creator: { type: String, require: true },
  premiere_year: { type: Number, require: true },
  end_year: { type: Number },
  seasons: { type: Number, require: true },
  genre: { type: String, require: true },
  rating: { type: Number, require: true },
});

// convert the schema to a model
const Show = model("Show", showSchema);
module.exports = Show;
