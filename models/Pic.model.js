const { Schema, model } = require("mongoose");

const picSchema = new Schema(
  {
    name: { type: String, required: true },
    portfolio: { type: String },
    img: { type: String },
  },
  { timestamps: true }
);

const Pic = model("Pic", picSchema);

module.exports = Pic;
