const mongoose = require('mongoose');
const { Schema } = mongoose;

const requestSchema = new Schema({
  requestId: { // changed from contentId.
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
  }, // url needs to go into postgres to find binkey, then get requests from mongo.
 body: {
    type: Object, // is this JSON or just string? // Aryan -> (I would say JSON)
  }
});



// Create model
const Request = mongoose.model('requests', requestSchema);

module.exports = Request;







// PROBABLY TO BE DELETED 
// could all of the required ones go into a requiredHeaders attribute so we just reduce the size?
// binKey: {
//   type: String,
//   required: true,
//   unique: true
// },
// host: {
//   type: String,
//   required: true
// },
// fromIp: {
//   type: String,
//   required: true
// },
// requestMethod: {
//   type: String,
//   required: true
// },
// connection: {
//   type: String,
//   required: true
// },
// userAgent: {
//   type: String,
//   required: true
// },
// accept: {
//   type: String,
//   required: true
// },
// createdTime: {
//   type: Timestamp,
//   default: Date.now,
//   required: true
// },
// contentType: {
//   type: String,
//   required: true
// },