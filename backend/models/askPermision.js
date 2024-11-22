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
  roomName: {
    type: String,
    required: true,
  },
  doorCode: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  entryTime: {
    type: String,
    required: true,
  },
  exitTime: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Permission = mongoose.model('PermissionRequests', permissionSchema);

module.exports = Permission;
