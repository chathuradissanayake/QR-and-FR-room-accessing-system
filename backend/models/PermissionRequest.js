const mongoose = require("mongoose");
const { Schema } = mongoose;

const permissionRequestSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: { 
      type: Schema.Types.ObjectId, 
      ref: "Company", 
      required: true 
    }, 
    door: {
      type: Schema.Types.ObjectId,
      ref: "Door",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    roomName: {
      type: String,
      required: true,
    },
    inTime: {
      type: String,
      required: true,
    },
    outTime: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    requestTime: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const PermissionRequest = mongoose.model(
  "PermissionRequest",
  permissionRequestSchema
);

module.exports = PermissionRequest;
