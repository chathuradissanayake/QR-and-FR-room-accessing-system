const mongoose = require('mongoose');

const timeSchema = new mongoose.Schema({
    
  entryTime: { type: Date },
  exitTime: { type: Date },
});


const Time = mongoose.model('Time', timeSchema);

module.exports = Time;