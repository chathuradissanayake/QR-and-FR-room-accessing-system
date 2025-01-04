const mongoose = require('mongoose');
const { Schema } = mongoose;

const companySchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  locations: [{ type: String }],
  admins: [{ type: Schema.Types.ObjectId, ref: 'AdminUser' }],
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);

module.exports = Company;