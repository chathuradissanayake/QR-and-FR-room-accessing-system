const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactUsSchema = new Schema({ 
  registerId: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  // heading: { 
  //   type: String, 
  //   default: null 
  // },
  reply: { 
    type: String, 
    default: null 
  },
  status: { 
    type: String, 
    enum: ['unread', 'read'], 
    default: 'unread' 
  },
  userstatus: { 
    type: String, 
    enum: ['unread', 'read', 'null'], 
    default: 'null' 
  },
  user: {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', required: true 
    },
  },
}, { timestamps: { createdAt: true, updatedAt: true } }); // Only createdAt, no updatedAt

const contactUsModel = mongoose.model('ContactUs', contactUsSchema);

module.exports = contactUsModel;
