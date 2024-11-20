const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactUsSchema = new Schema({ 
  message: {
    type: String,
    required: true,
  },
});


const contactUsModel = mongoose.model('contactUs', contactUsSchema);

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
