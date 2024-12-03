const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactUsSchema = new Schema({ 
  userId: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: { 
    type: String, 
    enum: ['unread', 'read'], 
    default: 'unread' 
  }
});


const contactUsModel = mongoose.model('ContactUs', contactUsSchema);

module.exports = contactUsModel;











// const mongoose = require('mongoose');

// const contactUsSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//     },
//   message: {
//     type: String,
//     required: true,
//   },
//   },{ timestamps: true });



//   module.exports = mongoose.model('contactUs', contactUsSchema);
