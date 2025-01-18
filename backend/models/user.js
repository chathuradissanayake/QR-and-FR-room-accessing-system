const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  faceCount: { type: Number, default: 0 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  profilePicture: { type: String, default: "null" },
  doorAccess: [{
    door: { type: Schema.Types.ObjectId, ref: 'Door' },
    inTime: { type: String },
    outTime: { type: String },
    date: { type: Date }
  }],
  pendingRequests: [{ type: Schema.Types.ObjectId, ref: 'PermissionRequest' }],
  history: [{
    door: { type: Schema.Types.ObjectId, ref: 'Door' },
    entryTime: { type: Date },
    exitTime: { type: Date },
    status: { type: String, enum: ['Active', 'Exited'], default: 'Active' },
  }],
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;