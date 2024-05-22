const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dateSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["pending", "belated", "done"],
  },
  due_date: {
    type: String,
  },
  type: {
    type: String,
    enum: ["rabies-vaccine", "tribal-vaccine", "external-parasites", "internal-parasites"],
  },
});

const Date = mongoose.model("Date", dateSchema);

module.exports = Date;