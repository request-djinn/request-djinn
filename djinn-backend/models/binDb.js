const mongoose = require('mongoose');
const { Schema } = mongoose;

const requestSchema = new Schema({
  requestId: { 
    type: String,
    required: true,
    unique: true
  },
  binKey: {
    type: String,
    required: true
  },
  headers: {
    type: Array,
    required: true
  }, 
 body: {
    type: Object, 
  }
});

const Request = mongoose.model('requests', requestSchema);

module.exports = Request;
