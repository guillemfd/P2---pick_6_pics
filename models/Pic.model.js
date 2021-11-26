const { Schema, model } = require("mongoose");

const picSchema = new Schema(
  {
    image: { type: String, required: true },
    photographer: { type: String, required: true },
    country: { type: String },
    portfolio: { type: String },
    downloads: {type: Number},
    fullimage: { type: String },
    //continent: {enum: ['Africa', 'Oceania']} //TODO: finish. Para en la V2 poder saber si ese continente ya tiene fav
  },
  { timestamps: true }
);

const Pic = model("Pic", picSchema);

module.exports = Pic;
