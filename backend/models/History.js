const mongoose = require("mongoose");
const { Schema } = mongoose;

const historySchema = new Schema({
  doorCode: { type: String, required: true },
  entryTime: { type: Date, required: true },
  exitTime: { type: Date, default: null },
  location: { type: String},
  roomName: { type: String},
  user: {
    userId: { type: String, required: true },
  },
});

const History = mongoose.model("History", historySchema);

module.exports = History;
