const mongoose = require('mongoose');
const { Schema } = mongoose;

const permissionSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  door: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  intime: {
    type: String,
    required: true,
  },
  outtime: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
